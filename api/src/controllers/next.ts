import {isMaster} from '../database/helpers/is-master';
import {SiteSettings} from '../types/site-settings';
import asyncHandler from '../utils/async-handler';
import {NextServer} from 'next/dist/server/next';
import {Request, Response} from 'express';
import {AssetsService} from '../services';
import getDatabase from '../database';
import {promises as fs} from 'fs';
import env from '../env';
import path from 'path';
import next from 'next';

export default async function () {
	const themesDir = path.resolve(__dirname, '../../../themes');
	const themes = await fs.readdir(themesDir);
	const apps: { [key: string]: { server: NextServer, handler: (req: Request, res: Response) => any } } = {};
	const cache: { [key: string]: SiteSettings } = {};

	setInterval(() => {
		for (const key of Object.keys(cache)) {
			if (cache[key].expiresAt <= Date.now()) {
				delete cache[key];
			}
		}
	}, 8000);

	for (const theme of themes) {
		const server = next({
			dev: env.NODE_ENV === 'development',
			dir: `${themesDir}/${theme}`,
			conf: {
				devIndicators: {
					buildActivity: true,
					buildActivityPosition: 'bottom-left',
				},
				typescript: {
					tsconfigPath: `../../themes/${theme}/tsconfig.json`,
				},
				poweredByHeader: false,
				distDir: `.next`,
				swcMinify: true,
			}
		});
		await server.prepare();

		apps[theme] = {
			server,
			handler: server.getRequestHandler(),
		};
	}

	return asyncHandler(async (req, res, next) => {
		if (req.path.startsWith('/api') || req.path.startsWith('/assets') || req.path.startsWith('/admin')) {
			return next();
		}

		const database = isMaster(req.knex) ? getDatabase('template') : req.knex;
		const databaseName = database.client.config.connection.database;

		if (!cache.hasOwnProperty(databaseName)) {
			const settings = await database.from('website')
				.select('project_name', 'project_logo', 'keywords', 'description', 'theme')
				.first();
			cache[databaseName] = {
				title: settings?.project_name ?? null,
				description: settings?.description ?? null,
				keywords: settings?.keywords ?? null,
				logo: settings?.project_logo ?? null,
				themeId: settings?.theme ?? 'al-munir',
				expiresAt: Date.now() + 8000,
			};
		}

		req.knex = database;
		req.siteSettings = cache[databaseName];

		if (req.path === '/favicon.ico') {
			const logo = cache[databaseName].logo;

			if (!logo) {
				return res.status(404)
					.send();
			}

			const assetService = new AssetsService({
				schema: req.schema,
				knex: req.knex,
				accountability: req.accountability,
			});

			const {stream, file, stat} = await assetService.getAsset(logo, {});

			res.attachment(file.filename_download);
			res.setHeader('Content-Length', stat.size);
			res.setHeader('Content-Type', file.type);

			// TODO: convert to ico on the fly.
		}

		const app = apps[cache[databaseName].themeId];

		app.handler(req, res);
	});
}
