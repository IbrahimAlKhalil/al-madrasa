/**
 * Custom properties on the req object in express
 */

import { Accountability } from '@directus/shared/types';
import { Query } from '@directus/shared/types';
import { SchemaOverview } from './schema';
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

			accountability?: Accountability;
			singleton?: boolean;
		}
	}
}
