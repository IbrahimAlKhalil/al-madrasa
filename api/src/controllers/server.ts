import { format } from 'date-fns';
import { Router } from 'express';
import {ForbiddenException, RouteNotFoundException, UnprocessableEntityException} from '../exceptions';
import { respond } from '../middleware/respond';
import {ItemsService, ServerService, SpecificationService} from '../services';
import asyncHandler from '../utils/async-handler';
import getDatabase, {databases} from '../database';
import {getSchema} from '../utils/get-schema';
import env from '../env';
import {isMaster} from '../database/helpers/is-master';
import {isTemplate} from '../database/helpers/is-template';

const router = Router();

router.get(
	'/specs/oas',
	asyncHandler(async (req, res, next) => {
		const service = new SpecificationService({
			accountability: req.accountability,
			schema: req.schema,
			knex: req.knex,
		});

		res.locals.payload = await service.oas.generate();
		return next();
	}),
	respond
);

router.get(
	'/specs/graphql/:scope?',
	asyncHandler(async (req, res) => {
		const service = new SpecificationService({
			accountability: req.accountability,
			schema: req.schema,
			knex: req.knex,
		});

		const serverService = new ServerService({
			accountability: req.accountability,
			schema: req.schema,
			knex: req.knex,
		});

		const scope = req.params.scope || 'items';

		if (['items', 'system'].includes(scope) === false) throw new RouteNotFoundException(req.path);

		const info = await serverService.serverInfo();
		const result = await service.graphql.generate(scope as 'items' | 'system');
		const filename = info.project.project_name + '_' + format(new Date(), 'yyyy-MM-dd') + '.graphql';

		res.attachment(filename);
		res.send(result);
	})
);

router.get('/ping', (req, res) => res.send('pong'));

router.get(
	'/info',
	asyncHandler(async (req, res, next) => {
		const service = new ServerService({
			accountability: req.accountability,
			schema: req.schema,
			knex: req.knex,
		});
		const data = await service.serverInfo();
		res.locals.payload = { data };
		return next();
	}),
	respond
);

router.get(
	'/health',
	asyncHandler(async (req, res, next) => {
		const service = new ServerService({
			accountability: req.accountability,
			schema: req.schema,
			knex: req.knex,
		});

		const data = await service.health();

		res.setHeader('Content-Type', 'application/health+json');

		if (data.status === 'error') res.status(503);
		res.locals.payload = data;
		res.locals.cache = false;
		return next();
	}),
	respond
);

router.get(
	'/apps',
	asyncHandler(async (req, res, next) => {
		if (!req?.accountability?.admin) {
			throw new ForbiddenException();
		}

		const service = new ItemsService('institute', {
			knex: getDatabase(),
			schema: await getSchema({
				database: getDatabase(),
			})
		});

		const results = await service.readByQuery({
			fields: ['id', 'db_name', 'name', 'code'],
			filter: {
				status: {
					_neq: 'archived',
				}
			}
		});

		res.locals.payload = [
			{
				app: 'master',
				code: null,
				name: 'Master'
			},
			{
				app: 'template',
				code: null,
				name: 'Template'
			},
			...results.map(r => ({
				app: r.db_name,
				code: r.code,
				name: r.name,
			}))
		];

		return next();
	}),
	respond
);

router.post(
	'/switch-app',
	asyncHandler(async (req, res, next) => {
		if (!req?.accountability?.admin) {
			throw new ForbiddenException();
		}

		if (!req.body.hasOwnProperty('app') || typeof req.body.app !== 'string' || !databases.hasOwnProperty(req.body.app)) {
			throw new UnprocessableEntityException('app must be a string');
		}

		const database = getDatabase(req.body.app, {
			database: req.body.app,
		});

		const session = await req.knex('directus_sessions')
			.where('token', req.cookies.directus_refresh_token)
			.first();

		if (!session) {
			throw new ForbiddenException();
		}

		const sessionCheck = await database('directus_sessions')
			.where('token', req.cookies.directus_refresh_token)
			.first();

		if (!sessionCheck) {
			await database('directus_sessions')
				.insert(session)
				.onConflict('token')
				.ignore();
		}

		res.cookie('al-mad-app', req.body.app);

		return next();
	}),
	respond
);

router.get(
	'/current-app',
	asyncHandler(async (req, res, next) => {
		if (!req?.accountability?.admin) {
			throw new ForbiddenException();
		}

		res.locals.payload = {
			app: isMaster(req.knex) ? 'master' : isTemplate(req.knex) ? 'template' : req.knex.client.config.connection.database,
		};

		return next();
	}),
	respond
);

export default router;
