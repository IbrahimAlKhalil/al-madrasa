import SchemaInspector from '@directus/schema';
import { knex, Knex } from 'knex';
import { performance } from 'perf_hooks';
import env from '../env';
import logger from '../logger';
import { getConfigFromEnv } from '../utils/get-config-from-env';
import { validateEnv } from '../utils/validate-env';
import fse from 'fs-extra';
import path from 'path';
import { merge } from 'lodash';
import { promisify } from 'util';
import { getHelpers } from './helpers';

export const databases: { [key: string]: Knex } = {};
export const inspectors: { [key: string]: ReturnType<typeof SchemaInspector> } = {};

export default function getDatabase(key = 'master', config?: Record<string, any>): Knex {
	if (databases.hasOwnProperty(key)) {
		return databases[key];
	}

	const connectionConfig: Record<string, any> = {
		...getConfigFromEnv('DB_', [
			'DB_CLIENT',
			'DB_SEARCH_PATH',
			'DB_CONNECTION_STRING',
			'DB_POOL',
			'DB_EXCLUDE_TABLES',
		]),
		...config
	};

	const poolConfig = getConfigFromEnv('DB_POOL');

	const requiredEnvVars = ['DB_CLIENT'];

	if (env.DB_CLIENT && env.DB_CLIENT === 'sqlite3') {
		requiredEnvVars.push('DB_FILENAME');
	} else if (env.DB_CLIENT && env.DB_CLIENT === 'oracledb') {
		if (!env.DB_CONNECT_STRING) {
			requiredEnvVars.push('DB_HOST', 'DB_PORT', 'DB_DATABASE', 'DB_USER', 'DB_PASSWORD');
		} else {
			requiredEnvVars.push('DB_USER', 'DB_PASSWORD', 'DB_CONNECT_STRING');
		}
	} else {
		if (env.DB_CLIENT === 'pg') {
			if (!env.DB_CONNECTION_STRING) {
				requiredEnvVars.push('DB_HOST', 'DB_PORT', 'DB_DATABASE', 'DB_USER');
			}
		} else {
			requiredEnvVars.push('DB_HOST', 'DB_PORT', 'DB_DATABASE', 'DB_USER', 'DB_PASSWORD');
		}
	}

	validateEnv(requiredEnvVars);

	const knexConfig: Knex.Config = {
		client: env.DB_CLIENT,
		searchPath: env.DB_SEARCH_PATH,
		connection: env.DB_CONNECTION_STRING || connectionConfig,
		log: {
			warn: (msg) => {
				// Ignore warnings about returning not being supported in some DBs
				if (msg.startsWith('.returning()')) return;

				// Ignore warning about MySQL not supporting TRX for DDL
				if (msg.startsWith('Transaction was implicitly committed, do not mix transactions and DDL with MySQL')) return;

				return logger.warn(msg);
			},
			error: (msg) => logger.error(msg),
			deprecate: (msg) => logger.info(msg),
			debug: (msg) => logger.debug(msg),
		},
		pool: poolConfig,
	};

	if (env.DB_CLIENT === 'sqlite3') {
		knexConfig.useNullAsDefault = true;

		poolConfig.afterCreate = async (conn: any, callback: any) => {
			logger.trace('Enabling SQLite Foreign Keys support...');

			const run = promisify(conn.run.bind(conn));
			await run('PRAGMA foreign_keys = ON');

			callback(null, conn);
		};
	}

	if (env.DB_CLIENT === 'mssql') {
		// This brings MS SQL in line with the other DB vendors. We shouldn't do any automatic
		// timezone conversion on the database level, especially not when other database vendors don't
		// act the same
		merge(knexConfig, { connection: { options: { useUTC: false } } });
	}

	databases[key] = knex(knexConfig);

	const times: Record<string, number> = {};

	databases[key]
		.on('query', (queryInfo) => {
			times[queryInfo.__knexUid] = performance.now();
		})
		.on('query-response', (response, queryInfo) => {
			const delta = performance.now() - times[queryInfo.__knexUid];
			logger.trace(`[${delta.toFixed(3)}ms] ${queryInfo.sql} [${queryInfo.bindings.join(', ')}]`);
			delete times[queryInfo.__knexUid];
		});

	return databases[key];
}

export function getSchemaInspector(key = 'master'): ReturnType<typeof SchemaInspector> {
	if (inspectors.hasOwnProperty(key)) {
		return inspectors[key];
	}

	const database = getDatabase(key);

	inspectors[key] = SchemaInspector(database);

	return inspectors[key];
}

export async function hasDatabaseConnection(database?: Knex): Promise<boolean> {
	database = database ?? getDatabase();

	try {
		if (getDatabaseClient(database) === 'oracle') {
			await database.raw('select 1 from DUAL');
		} else {
			await database.raw('SELECT 1');
		}

		return true;
	} catch {
		return false;
	}
}

export async function validateDatabaseConnection(database?: Knex): Promise<void> {
	database = database ?? getDatabase();

	try {
		if (getDatabaseClient(database) === 'oracle') {
			await database.raw('select 1 from DUAL');
		} else {
			await database.raw('SELECT 1');
		}
	} catch (error: any) {
		logger.error(`Can't connect to the database.`);
		logger.error(error);
		process.exit(1);
	}
}

export function getDatabaseClient(database?: Knex): 'mysql' | 'postgres' | 'sqlite' | 'oracle' | 'mssql' | 'redshift' {
	database = database ?? getDatabase();

	switch (database.client.constructor.name) {
		case 'Client_MySQL':
			return 'mysql';
		case 'Client_PG':
			return 'postgres';
		case 'Client_SQLite3':
			return 'sqlite';
		case 'Client_Oracledb':
		case 'Client_Oracle':
			return 'oracle';
		case 'Client_MSSQL':
			return 'mssql';
		case 'Client_Redshift':
			return 'redshift';
	}

	throw new Error(`Couldn't extract database client`);
}

export async function isInstalled(): Promise<boolean> {
	const inspector = getSchemaInspector();

	// The existence of a directus_collections table alone isn't a "proper" check to see if everything
	// is installed correctly of course, but it's safe enough to assume that this collection only
	// exists when Directus is properly installed.
	return await inspector.hasTable('directus_collections');
}

/**
 * These database extensions should be optional, so we don't throw or return any problem states when they don't
 */
export async function validateDatabaseExtensions(): Promise<void> {
	const database = getDatabase();
	const client = getDatabaseClient(database);
	const helpers = getHelpers(database);
	const geometrySupport = await helpers.st.supported();
	if (!geometrySupport) {
		switch (client) {
			case 'postgres':
				logger.warn(`PostGIS isn't installed. Geometry type support will be limited.`);
				break;
			case 'sqlite':
				logger.warn(`Spatialite isn't installed. Geometry type support will be limited.`);
				break;
			default:
				logger.warn(`Geometry type not supported on ${client}`);
		}
	}
}

export async function connectAllDatabases() {
	const knex = getDatabase();

	getDatabase('template', {
		database: env.DB_TEMPLATE,
	});

	const institutes = await knex.from('institute')
		.where(qb => {
			qb.whereNotNull('db_name')
			qb.where({
				status: 'published',
			});
		})
		.select(['db_name']);

	for (const institute of institutes) {
		if (databases.hasOwnProperty(institute.db_name)) {
			continue;
		}

		const database = getDatabase(institute.db_name, {
			database: institute.db_name,
		});

		try {
			await database.raw('SELECT 1');
		} catch (e) {
			await disconnectDatabase(institute.db_name);
		}
	}
}

export async function disconnectDatabase(database: string) {
	for (const key in databases) {
		if (!databases.hasOwnProperty(key)) {
			continue;
		}

		if (databases[key].client.config.connection.database === database) {
			await databases[key].destroy();
			delete databases[key];
			break;
		}
	}
}
