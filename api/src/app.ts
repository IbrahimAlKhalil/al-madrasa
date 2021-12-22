import cookieParser from 'cookie-parser';
import express, { Request, Response, RequestHandler } from 'express';
import fse from 'fs-extra';
import path from 'path';
import qs from 'qs';

import activityRouter from './controllers/activity';
import assetsRouter from './controllers/assets';
import authRouter from './controllers/auth';
import collectionsRouter from './controllers/collections';
import dashboardsRouter from './controllers/dashboards';
import extensionsRouter from './controllers/extensions';
import fieldsRouter from './controllers/fields';
import filesRouter from './controllers/files';
import foldersRouter from './controllers/folders';
import graphqlRouter from './controllers/graphql';
import itemsRouter from './controllers/items';
import notFoundHandler from './controllers/not-found';
import panelsRouter from './controllers/panels';
import notificationsRouter from './controllers/notifications';
import permissionsRouter from './controllers/permissions';
import presetsRouter from './controllers/presets';
import relationsRouter from './controllers/relations';
import revisionsRouter from './controllers/revisions';
import rolesRouter from './controllers/roles';
import serverRouter from './controllers/server';
import settingsRouter from './controllers/settings';
import usersRouter from './controllers/users';
import utilsRouter from './controllers/utils';
import webhooksRouter from './controllers/webhooks';
import {
	connectAllDatabases,
	isInstalled,
	validateDatabaseConnection,
	validateDatabaseExtensions,
	validateMigrations
} from './database';
import emitter from './emitter';
import env from './env';
import { InvalidPayloadException } from './exceptions';
import { getExtensionManager } from './extensions';
import logger, { expressLogger } from './logger';
import authenticate from './middleware/authenticate';
import getPermissions from './middleware/get-permissions';
import cache from './middleware/cache';
import { checkIP } from './middleware/check-ip';
import cors from './middleware/cors';
import errorHandler from './middleware/error-handler';
import extractToken from './middleware/extract-token';
import rateLimiter from './middleware/rate-limiter';
import sanitizeQuery from './middleware/sanitize-query';
import schema from './middleware/schema';
import database from './middleware/database';

import { track } from './utils/track';
import { validateEnv } from './utils/validate-env';
import { validateStorage } from './utils/validate-storage';
import { register as registerWebhooks } from './webhooks';
import { flushCaches } from './cache';
import { registerAuthProviders } from './auth';
import { Url } from './utils/url';
import nextJs from './controllers/next';

export default async function createApp(): Promise<express.Application> {
	validateEnv(['KEY', 'SECRET']);

	if (!new Url(env.PUBLIC_URL).isAbsolute()) {
		logger.warn('PUBLIC_URL should be a full URL');
	}

	await validateStorage();

	await validateDatabaseConnection();
	await validateDatabaseExtensions();
	await connectAllDatabases();

	if ((await isInstalled()) === false) {
		logger.error(`Database doesn't have Directus tables installed.`);
		process.exit(1);
	}

	if ((await validateMigrations()) === false) {
		logger.warn(`Database migrations have not all been run`);
	}

	await flushCaches();

	await registerAuthProviders();

	const extensionManager = getExtensionManager();

	await extensionManager.initialize();

	const app = express();

	app.disable('x-powered-by');
	app.set('trust proxy', true);
	app.set('query parser', (str: string) => qs.parse(str, { depth: 10 }));

	await emitter.emitInit('app.before', { app });

	await emitter.emitInit('middlewares.before', { app });

	app.use(expressLogger);

	app.use((req, res, next) => {
		(
			express.json({
				limit: env.MAX_PAYLOAD_SIZE,
			}) as RequestHandler
		)(req, res, (err: any) => {
			if (err) {
				return next(new InvalidPayloadException(err.message));
			}

			return next();
		});
	});

	app.use(cookieParser());

	app.use(extractToken);

	app.use((req, res, next) => {
		res.setHeader('X-Powered-By', 'Directus');
		next();
	});

	if (env.CORS_ENABLED === true) {
		app.use(cors);
	}

	if (env.SERVE_APP && env.NODE_ENV === 'production') {
		const adminPath = path.resolve(__dirname, '../../app/dist/index.html');
		const adminUrl = new Url(env.PUBLIC_URL).addPath('admin');

		// Set the App's base path according to the APIs public URL
		const html = await fse.readFile(adminPath, 'utf8');
		const htmlWithBase = html.replace(/<base \/>/, `<base href="${adminUrl.toString({ rootRelative: true })}/" />`);

		const noCacheIndexHtmlHandler = (req: Request, res: Response) => {
			res.setHeader('Cache-Control', 'no-cache');
			res.send(htmlWithBase);
		};

		app.get('/admin', noCacheIndexHtmlHandler);
		app.use('/admin', express.static(path.join(adminPath, '..')));
		app.use('/admin/*', noCacheIndexHtmlHandler);
	}

	if (env.NODE_ENV === 'development') {
		const vite = await import('vite');

		const viteServer = await vite.createServer({
			root: path.resolve(__dirname, '../../app'),
		});

		app.use('/admin', viteServer.middlewares);
	}

	app.use(database);

	app.use(schema);

	const themeRouter = await nextJs();

	app.use('/', themeRouter);
	app.use('/_next', themeRouter);

	app.use((req, res, next) => {
		(
			express.json({
				limit: env.MAX_PAYLOAD_SIZE,
			}) as RequestHandler
		)(req, res, (err: any) => {
			if (err) {
				return next(new InvalidPayloadException(err.message));
			}

			return next();
		});
	});

	// use the rate limiter - all routes for now
	if (env.RATE_LIMITER_ENABLED === true) {
		app.use(rateLimiter);
	}

	app.use(authenticate);

	app.use(checkIP);

	app.use(sanitizeQuery);

	app.use(cache);

	app.use(getPermissions);

	await emitter.emitInit('middlewares.after', { app });

	await emitter.emitInit('routes.before', { app });

	app.use('/assets', assetsRouter);

	const router = express.Router();

	router.use('/auth', authRouter);

	router.use('/graphql', graphqlRouter);

	router.use('/activity', activityRouter);
	router.use('/collections', collectionsRouter);
	router.use('/dashboards', dashboardsRouter);
	router.use('/extensions', extensionsRouter);
	router.use('/fields', fieldsRouter);
	router.use('/files', filesRouter);
	router.use('/folders', foldersRouter);
	router.use('/items', itemsRouter);
	router.use('/notifications', notificationsRouter);
	router.use('/panels', panelsRouter);
	router.use('/permissions', permissionsRouter);
	router.use('/presets', presetsRouter);
	router.use('/relations', relationsRouter);
	router.use('/revisions', revisionsRouter);
	router.use('/roles', rolesRouter);
	router.use('/server', serverRouter);
	router.use('/settings', settingsRouter);
	router.use('/users', usersRouter);
	router.use('/utils', utilsRouter);
	router.use('/webhooks', webhooksRouter);

	app.use('/api', router);

	// Register custom endpoints
	await emitter.emitInit('routes.custom.before', { app });
	app.use(extensionManager.getEndpointRouter());
	await emitter.emitInit('routes.custom.after', { app });

	app.use(notFoundHandler);
	app.use(errorHandler);

	await emitter.emitInit('routes.after', { app });

	// Register all webhooks
	await registerWebhooks();

	track('serverStarted');

	await emitter.emitInit('app.after', { app });

	return app;
}
