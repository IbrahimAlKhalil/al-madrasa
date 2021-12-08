import asyncHandler from '../utils/async-handler';
import {RequestHandler} from 'express';
import getDatabase from '../database';

const schema: RequestHandler = asyncHandler(async (req, res, next) => {
	req.masterDB = getDatabase('master');

	const institute = await req.masterDB.from('institute')
		.where('domain', req.hostname)
		.select('db_name')
		.first();

	req.knex = getDatabase(req.cookies['al-mad-app'] ?? req.header('X-Al-Mad-App') ?? institute?.db_name ?? 'master');

	return next();
});

export default schema;
