import asyncHandler from '../utils/async-handler';
import {RequestHandler} from 'express';
import getDatabase from '../database';

const schema: RequestHandler = asyncHandler(async (req, res, next) => {
	req.masterDB = getDatabase('master');

	const key = req.query.al_mad_app ?? req.cookies['al-mad-app'] ?? req.header('X-Al-Mad-App');

	const query = req.masterDB.from('institute')
		.select('db_name')

	if (key) {
		query.where('db_name', key);
	} else {
		query.where('domain', req.hostname.replace('www.', ''));
	}

	const institute = await query.first();

	req.knex = getDatabase(key ?? institute?.db_name ?? 'master') ?? req.masterDB;

	return next();
});

export default schema;
