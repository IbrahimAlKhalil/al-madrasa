import {ActionHandler, FilterHandler, InitHandler, ScheduleHandler} from "./extensions";
import {getSchema} from "../utils/get-schema";
import * as exceptions from "../exceptions";
import * as services from "../services";
import getDatabase from "../database";
import {Logger} from "pino";
import env from "../env";

export interface HookRegistrar {
	filter: (event: string, handler: FilterHandler) => void;
	action: (event: string, handler: ActionHandler) => void;
	init: (event: string, handler: InitHandler) => void;
	schedule: (cron: string, handler: ScheduleHandler) => void;
}

export interface HookRegistrarCtx {
	services: typeof services,
	exceptions: typeof exceptions,
	env: typeof env,
	getDatabase: typeof getDatabase,
	logger: Logger,
	getSchema: typeof getSchema
}
