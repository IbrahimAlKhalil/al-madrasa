import asyncHandler from '../utils/async-handler';
import {RequestHandler} from 'express';
import getDatabase from '../database';

const schema: RequestHandler = asyncHandler(async (req, res, next) => {
	req.masterDB = getDatabase('master');

	const institute = await req.masterDB.from('institute')
		.where('domain', req.hostname.replace('www.', ''))
		.select('db_name', 'qmmsoft_qb')
		.first();

	req.qmmsoftDB = institute?.qmmsoft_db ?? null;
	req.knex = getDatabase(req.query.al_mad_app ?? req.cookies['al-mad-app'] ?? req.header('X-Al-Mad-App') ?? institute?.db_name ?? 'master') ?? req.masterDB;

	return next();
});

export default schema;
