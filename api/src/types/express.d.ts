/**
 * Custom properties on the req object in express
 */

import { Accountability } from '@directus/shared/types';
import { Query } from '@directus/shared/types';
import {SiteSettings} from './site-settings';
import { SchemaOverview } from './schema';
import * as services from '../services';
import {Knex} from "knex";

export {};

declare global {
	namespace Express {
		export interface Request {
			token: string | null;
			collection: string;
			sanitizedQuery: Query;
			schema: SchemaOverview;
			knex: Knex;

			siteSettings?: SiteSettings;
			masterDB: Knex;
			services?: typeof services;

			accountability?: Accountability;
			singleton?: boolean;
		}
	}
}
