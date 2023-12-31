import { RequestHandler } from 'express';
import asyncHandler from '../utils/async-handler';
import { getSchema } from '../utils/get-schema';

const schema: RequestHandler = asyncHandler(async (req, res, next) => {
	req.schema = await getSchema({ accountability: req.accountability, database: req.knex });
	return next();
});

export default schema;
