import asyncHandler from '../utils/async-handler';
import {RequestHandler} from 'express';
import getDatabase from '../database';

const schema: RequestHandler = asyncHandler(async (req, res, next) => {
	req.masterDB = getDatabase('master');

	const key = req.query.al_mad_app ?? req.cookies['al-mad-app'] ?? req.header('X-Al-Mad-App');

	const query = req.masterDB.from('institute')
		.select('db_name', 'qmmsoft_db', 'qmmsoft_db_2', 'qmmsoft_db_3', 'qmmsoft_db_4')

	if (key) {
		query.where('db_name', key);
	} else {
		query.where('domain', req.hostname.replace('www.', ''));
	}

	const institute = await query.first();

	req.qmmsoftDB = {
		db_1: institute?.qmmsoft_db ?? null,
		db_2: institute?.qmmsoft_db_2 ?? null,
		db_3: institute?.qmmsoft_db_3 ?? null,
		db_4: institute?.qmmsoft_db_4 ?? null,
	};
	req.knex = getDatabase(key ?? institute?.db_name ?? 'master') ?? req.masterDB;

	return next();
});

export default schema;
