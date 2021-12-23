import path from 'path';
import { AppExtensionType, Extension, ExtensionType } from '@directus/shared/types';
import {
	getLocalExtensions,
	getPackageExtensions,
} from '@directus/shared/utils/node';
import {
	API_EXTENSION_PACKAGE_TYPES,
	API_EXTENSION_TYPES,
} from '@directus/shared/constants';
import getDatabase from './database';
import emitter from './emitter';
import env from './env';
import * as exceptions from './exceptions';
import logger from './logger';
import { HookConfig, FilterHandler, ActionHandler, InitHandler, ScheduleHandler } from './types';
import { getSchema } from './utils/get-schema';

import * as services from './services';
import { schedule, ScheduledTask, validate } from 'node-cron';
// @TODO Remove this once a new version of @rollup/plugin-virtual has been released
// @ts-expect-error
import virtual from '@rollup/plugin-virtual';
import getModuleDefault from './utils/get-module-default';
import * as fs from "fs";

let extensionManager: ExtensionManager | undefined;

export function getExtensionManager(): ExtensionManager {
	if (extensionManager) {
		return extensionManager;
	}

	extensionManager = new ExtensionManager();

	return extensionManager;
}

class ExtensionManager {
	private isInitialized = false;

	private extensions: Extension[] = [];

	private appExtensions: Partial<Record<AppExtensionType, string>> = {};

	private apiHooks: (
		| { type: 'filter'; path: string; event: string; handler: FilterHandler }
		| { type: 'action'; path: string; event: string; handler: ActionHandler }
		| { type: 'init'; path: string; event: string; handler: InitHandler }
		| { type: 'schedule'; path: string; task: ScheduledTask }
	)[] = [];
	private isScheduleHookEnabled = true;

	public async initialize({ schedule } = { schedule: true }): Promise<void> {
		this.isScheduleHookEnabled = schedule;

		if (this.isInitialized) return;

		try {
			this.extensions = await this.getExtensions();
		} catch (err: any) {
			logger.warn(`Couldn't load extensions`);
			logger.warn(err);
		}

		this.registerCustomHooks();
		this.registerHooks();

		const loadedExtensions = this.listExtensions();
		if (loadedExtensions.length > 0) {
			logger.info(`Loaded extensions: ${loadedExtensions.join(', ')}`);
		}

		this.isInitialized = true;
	}

	public async reload(): Promise<void> {
		if (!this.isInitialized) return;

		logger.info('Reloading extensions');

		this.unregisterHooks();

		this.isInitialized = false;
		await this.initialize();
	}

	public listExtensions(type?: ExtensionType): string[] {
		if (type === undefined) {
			return this.extensions.map((extension) => extension.name);
		} else {
			return this.extensions.filter((extension) => extension.type === type).map((extension) => extension.name);
		}
	}

	public getAppExtensions(type: AppExtensionType): string | undefined {
		return this.appExtensions[type];
	}

	private async getExtensions(): Promise<Extension[]> {
		const packageExtensions = await getPackageExtensions(
			'.',
			API_EXTENSION_PACKAGE_TYPES
		);
		const localExtensions = await getLocalExtensions(
			env.EXTENSIONS_PATH,
			API_EXTENSION_TYPES
		);

		return [...packageExtensions, ...localExtensions];
	}

	private registerCustomHooks() {
		const files = fs.readdirSync(path.resolve(__dirname, './hooks'));

		for (const file of files) {
			const filePath = path.resolve(__dirname, `./hooks/${file}`);
			const register = require(filePath).default;

			const registerFunctions = {
				filter: (event: string, handler: FilterHandler) => {
					emitter.onFilter(event, handler);

					this.apiHooks.push({
						type: 'filter',
						path: path.resolve(__dirname, `./hooks/${file}`),
						event,
						handler,
					});
				},
				action: (event: string, handler: ActionHandler) => {
					emitter.onAction(event, handler);

					this.apiHooks.push({
						type: 'action',
						path: filePath,
						event,
						handler,
					});
				},
				init: (event: string, handler: InitHandler) => {
					emitter.onInit(event, handler);

					this.apiHooks.push({
						type: 'init',
						path: filePath,
						event,
						handler,
					});
				},
				schedule: (cron: string, handler: ScheduleHandler) => {
					if (validate(cron)) {
						const task = schedule(cron, async () => {
							if (this.isScheduleHookEnabled) {
								try {
									await handler();
								} catch (error: any) {
									logger.error(error);
								}
							}
						});

						this.apiHooks.push({
							type: 'schedule',
							path: filePath,
							task,
						});
					} else {
						logger.warn(`Couldn't register cron hook. Provided cron is invalid: ${cron}`);
					}
				},
			};

			register(registerFunctions, { services, exceptions, env, getDatabase, logger, getSchema });
		}
	}

	private registerHooks(): void {
		const hooks = this.extensions.filter((extension) => extension.type === 'hook');

		for (const hook of hooks) {
			try {
				this.registerHook(hook);
			} catch (error: any) {
				logger.warn(`Couldn't register hook "${hook.name}"`);
				logger.warn(error);
			}
		}
	}

	private registerHook(hook: Extension) {
		const hookPath = path.resolve(hook.path, hook.entrypoint || '');
		const hookInstance: HookConfig | { default: HookConfig } = require(hookPath);

		const register = getModuleDefault(hookInstance);

		const registerFunctions = {
			filter: (event: string, handler: FilterHandler) => {
				emitter.onFilter(event, handler);

				this.apiHooks.push({
					type: 'filter',
					path: hookPath,
					event,
					handler,
				});
			},
			action: (event: string, handler: ActionHandler) => {
				emitter.onAction(event, handler);

				this.apiHooks.push({
					type: 'action',
					path: hookPath,
					event,
					handler,
				});
			},
			init: (event: string, handler: InitHandler) => {
				emitter.onInit(event, handler);

				this.apiHooks.push({
					type: 'init',
					path: hookPath,
					event,
					handler,
				});
			},
			schedule: (cron: string, handler: ScheduleHandler) => {
				if (validate(cron)) {
					const task = schedule(cron, async () => {
						if (this.isScheduleHookEnabled) {
							try {
								await handler();
							} catch (error: any) {
								logger.error(error);
							}
						}
					});

					this.apiHooks.push({
						type: 'schedule',
						path: hookPath,
						task,
					});
				} else {
					logger.warn(`Couldn't register cron hook. Provided cron is invalid: ${cron}`);
				}
			},
		};

		register(registerFunctions, { services, exceptions, env, getDatabase, logger, getSchema });
	}

	private unregisterHooks(): void {
		for (const hook of this.apiHooks) {
			switch (hook.type) {
				case 'filter':
					emitter.offFilter(hook.event, hook.handler);
					break;
				case 'action':
					emitter.offAction(hook.event, hook.handler);
					break;
				case 'init':
					emitter.offInit(hook.event, hook.handler);
					break;
				case 'schedule':
					hook.task.destroy();
					break;
			}

			delete require.cache[require.resolve(hook.path)];
		}

		this.apiHooks = [];
	}
}
