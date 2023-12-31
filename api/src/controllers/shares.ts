import express from 'express';
import { ForbiddenException, InvalidPayloadException } from '../exceptions';
import { respond } from '../middleware/respond';
import useCollection from '../middleware/use-collection';
import { validateBatch } from '../middleware/validate-batch';
import { SharesService } from '../services';
import { PrimaryKey } from '../types';
import asyncHandler from '../utils/async-handler';
import { UUID_REGEX, COOKIE_OPTIONS } from '../constants';
import Joi from 'joi';
import env from '../env';

const router = express.Router();

router.use(useCollection('directus_shares'));

const sharedLoginSchema = Joi.object({
	share: Joi.string().required(),
	password: Joi.string(),
}).unknown();

router.post(
	'/auth',
	asyncHandler(async (req, res, next) => {
		// This doesn't use accountability, as the user isn't logged in at this point
		const service = new SharesService({
			schema: req.schema,
			knex: req.knex,
		});

		const { error } = sharedLoginSchema.validate(req.body);

		if (error) {
			throw new InvalidPayloadException(error.message);
		}

		const { accessToken, refreshToken, expires } = await service.login(req.body);

		res.cookie(env.REFRESH_TOKEN_COOKIE_NAME, refreshToken, COOKIE_OPTIONS);

		res.locals.payload = { data: { access_token: accessToken, expires } };

		return next();
	}),
	respond
);

const sharedInviteSchema = Joi.object({
	share: Joi.string().required(),
	emails: Joi.array().items(Joi.string()),
}).unknown();

router.post(
	'/invite',
	asyncHandler(async (req, res, next) => {
		const service = new SharesService({
			schema: req.schema,
			accountability: req.accountability,
			knex: req.knex,
		});

		const { error } = sharedInviteSchema.validate(req.body);

		if (error) {
			throw new InvalidPayloadException(error.message);
		}

		await service.invite(req.body);

		return next();
	}),
	respond
);

router.post(
	'/',
	asyncHandler(async (req, res, next) => {
		const service = new SharesService({
			accountability: req.accountability,
			schema: req.schema,
			knex: req.knex,
		});

		const savedKeys: PrimaryKey[] = [];

		if (Array.isArray(req.body)) {
			const keys = await service.createMany(req.body);
			savedKeys.push(...keys);
		} else {
			const key = await service.createOne(req.body);
			savedKeys.push(key);
		}

		try {
			if (Array.isArray(req.body)) {
				const items = await service.readMany(savedKeys, req.sanitizedQuery);
				res.locals.payload = { data: items };
			} else {
				const item = await service.readOne(savedKeys[0], req.sanitizedQuery);
				res.locals.payload = { data: item };
			}
		} catch (error) {
			if (error instanceof ForbiddenException) {
				return next();
			}

			throw error;
		}

		return next();
	}),
	respond
);

const readHandler = asyncHandler(async (req, res, next) => {
	const service = new SharesService({
		accountability: req.accountability,
		schema: req.schema,
		knex: req.knex,
	});

	const records = await service.readByQuery(req.sanitizedQuery);

	res.locals.payload = { data: records || null };
	return next();
});

router.get('/', validateBatch('read'), readHandler, respond);
router.search('/', validateBatch('read'), readHandler, respond);

router.get(
	`/info/:pk(${UUID_REGEX})`,
	asyncHandler(async (req, res, next) => {
		const service = new SharesService({
			schema: req.schema,
			knex: req.knex,
		});

		const record = await service.readOne(req.params.pk, {
			fields: ['id', 'collection', 'item', 'password', 'max_uses', 'times_used', 'date_start', 'date_end'],
			filter: {
				_and: [
					{
						_or: [
							{
								date_start: {
									_lte: new Date().toISOString(),
								},
							},
							{
								date_start: {
									_null: true,
								},
							},
						],
					},
					{
						_or: [
							{
								date_end: {
									_gte: new Date().toISOString(),
								},
							},
							{
								date_end: {
									_null: true,
								},
							},
						],
					},
				],
			},
		});

		res.locals.payload = { data: record || null };
		return next();
	}),
	respond
);

router.get(
	`/:pk(${UUID_REGEX})`,
	asyncHandler(async (req, res, next) => {
		const service = new SharesService({
			accountability: req.accountability,
			schema: req.schema,
			knex: req.knex,
		});

		const record = await service.readOne(req.params.pk, req.sanitizedQuery);

		res.locals.payload = { data: record || null };
		return next();
	}),
	respond
);

router.patch(
	'/',
	validateBatch('update'),
	asyncHandler(async (req, res, next) => {
		const service = new SharesService({
			accountability: req.accountability,
			schema: req.schema,
			knex: req.knex,
		});

		let keys: PrimaryKey[] = [];

		if (req.body.keys) {
			keys = await service.updateMany(req.body.keys, req.body.data);
		} else {
			keys = await service.updateByQuery(req.body.query, req.body.data);
		}

		try {
			const result = await service.readMany(keys, req.sanitizedQuery);
			res.locals.payload = { data: result };
		} catch (error) {
			if (error instanceof ForbiddenException) {
				return next();
			}

			throw error;
		}

		return next();
	}),
	respond
);

router.patch(
	`/:pk(${UUID_REGEX})`,
	asyncHandler(async (req, res, next) => {
		const service = new SharesService({
			accountability: req.accountability,
			schema: req.schema,
			knex: req.knex,
		});

		const primaryKey = await service.updateOne(req.params.pk, req.body);

		try {
			const item = await service.readOne(primaryKey, req.sanitizedQuery);
			res.locals.payload = { data: item || null };
		} catch (error) {
			if (error instanceof ForbiddenException) {
				return next();
			}

			throw error;
		}

		return next();
	}),
	respond
);

router.delete(
	'/',
	asyncHandler(async (req, _res, next) => {
		const service = new SharesService({
			accountability: req.accountability,
			schema: req.schema,
			knex: req.knex,
		});

		if (Array.isArray(req.body)) {
			await service.deleteMany(req.body);
		} else if (req.body.keys) {
			await service.deleteMany(req.body.keys);
		} else {
			await service.deleteByQuery(req.body.query);
		}

		return next();
	}),
	respond
);

router.delete(
	`/:pk(${UUID_REGEX})`,
	asyncHandler(async (req, _res, next) => {
		const service = new SharesService({
			accountability: req.accountability,
			schema: req.schema,
			knex: req.knex,
		});

		await service.deleteOne(req.params.pk);

		return next();
	}),
	respond
);

export default router;
