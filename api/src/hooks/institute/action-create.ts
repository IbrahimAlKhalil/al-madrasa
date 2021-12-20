import getDatabase, {disconnectDatabase} from '../../database';
import {isMaster} from '../../database/helpers/is-master';
import {ActionHandler, SchemaOverview} from '../../types';
import {ItemsService} from '../../services';
import fsSync, {promises as fs} from 'fs';
import logger from '../../logger';
import crypto from 'crypto';
import env from '../../env';
import execa from 'execa';
import path from 'path';

export const actionCreate: ActionHandler = async (meta, context) => {
	if (!isMaster(context.database)) {
		return;
	}

	const masterDB = getDatabase();

	const instituteService = new ItemsService('institute', {
		knex: masterDB,
		schema: context.schema as SchemaOverview,
	});

	const institute = await instituteService.readOne(meta.key);

	try {
		const tempPath = path.resolve(__dirname, '../../../../temp');
		const dumpFile = `${tempPath}/${institute.db_name}_${crypto.randomBytes(4).toString('hex')}.tar`;

		if (!fsSync.existsSync(tempPath)) {
			await fs.mkdir(tempPath);
		}

		execa.sync('/usr/bin/pg_dump', [
			`--username=${env.DB_USER}`,
			`--host=${env.DB_HOST}`,
			`--port=${env.DB_PORT}`,
			'--format=custom',
			'--no-owner',
			'--no-privileges',
			'--disable-triggers',
			'--no-acl',
			'--inserts',
			'--quote-all-identifiers',
			'--no-password',
			`--dbname=${env.DB_TEMPLATE}`,
			`--file=${dumpFile}`
		], {
			env: {
				PGPASSWORD: env.DB_PASSWORD,
			},
			shell: true,
			stdio: 'ignore'
		});

		await masterDB.raw(`
		   CREATE DATABASE "${institute.db_name}"
           WITH
           OWNER = "${env.DB_USER}"
           ENCODING = 'UTF8'
           CONNECTION LIMIT = -1;`);

		execa.sync('/usr/bin/pg_restore', [
			dumpFile,
			`--username=${process.env.DB_USER}`,
			`--host=${process.env.DB_HOST}`,
			`--port=${process.env.DB_PORT}`,
			'--no-owner',
			'--no-privileges',
			'--disable-triggers',
			'--no-acl',
			'--no-password',
			`--dbname=${institute.db_name}`,
		], {
			env: {
				PGPASSWORD: env.DB_PASSWORD,
			},
			shell: true,
			stdio: 'ignore'
		});

		await fs.rm(dumpFile);

		await getDatabase(institute.db_name, {
			database: institute.db_name,
		});
	} catch (e) {
		logger.error((e as any).message);
	} finally {
		getDatabase('template', {database: env.DB_TEMPLATE});
	}

	if (institute.status === 'archived') {
		await disconnectDatabase(institute.db_name);
	}
};
