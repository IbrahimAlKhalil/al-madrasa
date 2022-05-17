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
			qmmsoftDB: {
				[key: string]: string | null;

				db_1: string | null;
				db_2: string | null;
				db_3: string | null;
				db_4: string | null;
			};

			accountability?: Accountability;
			singleton?: boolean;
		}
	}
}
