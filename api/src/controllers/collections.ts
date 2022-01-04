import { Router } from 'express';
import {ForbiddenException, UnprocessableEntityException} from '../exceptions';
import { respond } from '../middleware/respond';
import { validateBatch } from '../middleware/validate-batch';
import { CollectionsService, MetaService } from '../services';
import { Item } from '../types';
import asyncHandler from '../utils/async-handler';
import {isTemplate} from '../database/helpers/is-template';
import {isMaster} from '../database/helpers/is-master';
import {getChildDatabases} from '../database/helpers/get-child-databases';
import { Knex } from 'knex';
import {saveMetadata} from '../middleware/save-metadata';

const router = Router();

router.post(
	'/',
	asyncHandler(async (req, res, next) => {
		if (isTemplate(req.knex) || isMaster(req.knex)) {
			let databases: Knex[] = [];

			if (isMaster(req.knex)) {
				databases.push(req.knex);
			} else {
				databases = await getChildDatabases();
			}


			for (const database of databases) {
				const collectionsService = new CollectionsService({
					accountability: req.accountability,
					schema: req.schema,
					knex: database,
				});

				if (Array.isArray(req.body)) {
					const collectionKey = await collectionsService.createMany(req.body);
					const records = await collectionsService.readMany(collectionKey);
					res.locals.payload = { data: records || null };
				} else {
					const collectionKey = await collectionsService.createOne(req.body);
					const record = await collectionsService.readOne(collectionKey);
					res.locals.payload = { data: record || null };
				}
			}
		} else {
			throw new UnprocessableEntityException(`Database structure in child database is readonly`);
		}

		return next();
	})
);

const readHandler = asyncHandler(async (req, res, next) => {
	const collectionsService = new CollectionsService({
		accountability: req.accountability,
		schema: req.schema,
		knex: req.knex,
	});

	const metaService = new MetaService({
		accountability: req.accountability,
		schema: req.schema,
		knex: req.knex,
	});

	let result: Item[] = [];

	if (req.body.keys) {
		result = await collectionsService.readMany(req.body.keys);
	} else {
		result = await collectionsService.readByQuery();
	}

	const meta = await metaService.getMetaForQuery('directus_collections', {});

	res.locals.payload = { data: result, meta };
	return next();
});

router.get('/', validateBatch('read'), readHandler);
router.search('/', validateBatch('read'), readHandler);

router.get(
	'/:collection',
	asyncHandler(async (req, res, next) => {
		const collectionsService = new CollectionsService({
			accountability: req.accountability,
			schema: req.schema,
			knex: req.knex,
		});

		const collection = await collectionsService.readOne(req.params.collection);
		res.locals.payload = { data: collection || null };

		return next();
	})
);

router.patch(
	'/:collection',
	asyncHandler(async (req, res, next) => {
		if (isTemplate(req.knex) || isMaster(req.knex)) {
			let databases: Knex[] = [];

			if (isMaster(req.knex)) {
				databases.push(req.knex);
			} else {
				databases = await getChildDatabases();
			}

			for (const database of databases) {
				const collectionsService = new CollectionsService({
					accountability: req.accountability,
					schema: req.schema,
					knex: database,
				});

				await collectionsService.updateOne(req.params.collection, req.body);

				try {
					const collection = await collectionsService.readOne(req.params.collection);
					res.locals.payload = { data: collection || null };
				} catch (error: any) {
					if (error instanceof ForbiddenException) {
						return next();
					}

					throw error;
				}
			}
		} else {
			throw new UnprocessableEntityException(`Database structure in child database is readonly`);
		}

		return next();
	})
);

router.delete(
	'/:collection',
	asyncHandler(async (req, res, next) => {
		if (isTemplate(req.knex) || isMaster(req.knex)) {
			let databases: Knex[] = [];

			if (isMaster(req.knex)) {
				databases.push(req.knex);
			} else {
				databases = await getChildDatabases();
			}

			for (const database of databases) {
				const collectionsService = new CollectionsService({
					accountability: req.accountability,
					schema: req.schema,
					knex: database,
				});

				await collectionsService.deleteOne(req.params.collection);
			}
		} else {
			throw new UnprocessableEntityException(`Database structure in child database is readonly`);
		}

		return next();
	})
);

router.use(saveMetadata);
router.use(respond);

export default router;
