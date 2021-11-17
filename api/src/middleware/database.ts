import { RequestHandler } from 'express';
import asyncHandler from '../utils/async-handler';
import getDatabase from "../database";

const schema: RequestHandler = asyncHandler(async (req, res, next) => {
	req.knex = getDatabase(req.cookies['al-mad-app'] ?? req.header('X-Al-Mad-App') ?? 'master');
	return next();
});

export default schema;
