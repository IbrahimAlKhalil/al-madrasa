import {getChildDatabases} from '../database/helpers/get-child-databases';
import {isMaster} from '../database/helpers/is-master';
import asyncHandler from '../utils/async-handler';
import fsSync, {promises as fs} from 'fs';
import crypto from 'crypto';
import {Knex} from 'knex';
import env from '../env';
import path from 'path';

const methods = new Set(['POST', 'PATCH', 'DELETE']);

export const saveMetadata = asyncHandler(async (req, res, next) => {
	if (!methods.has(req.method) || env.NODE_ENV !== 'development' || req.query.do_not_save) {
		return next();
	}

	const metadataDir = path.resolve(__dirname, '../../../metadata');

	if (!fsSync.existsSync(metadataDir)) {
		await fs.mkdir(metadataDir);
	}

	const database = isMaster(req.knex) ? 'master' : 'template';
	const id = Date.now();

	let databases: Knex[] = [];

	if (database === 'master') {
		databases.push(req.knex);
	} else {
		databases = databases.concat(await getChildDatabases());
	}

	for (const knex of databases) {
		await knex.table('am_migration')
			.insert({id});
	}

	const content = JSON.stringify({
		database,
		method: req.method,
		url: req.originalUrl,
		data: req.body,
	});
	const hash = crypto.createHash('md5').update(JSON.stringify(req.body)).digest('hex');

	await fs.writeFile(`${metadataDir}/${id}_${hash}.json`, content, {
		encoding: 'utf-8'
	});

	next();
});
