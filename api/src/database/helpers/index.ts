import { getDatabaseClient } from '..';
import { Knex } from 'knex';

import * as dateHelpers from './date';
import * as geometryHelpers from './geometry';
import * as schemaHelpers from './schema';

export function getHelpers(database: Knex) {
	const client = getDatabaseClient(database);

	return {
		date: dateHelpers.getDateHelper(database) as any,
		st: geometryHelpers.getGeometryHelper(database) as any,
		schema: new schemaHelpers[client](database) as any,
	};
}

export type Helpers = ReturnType<typeof getHelpers>;
