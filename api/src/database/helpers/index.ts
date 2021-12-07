import { getDatabaseClient } from '..';
import { Knex } from 'knex';

import {getDateHelper} from './date';
import {getGeometryHelper} from './geometry';

export function getHelpers(database: Knex): any {
	return {
		date: getDateHelper(database),
		st: getGeometryHelper(database),
	};
}

export type Helpers = ReturnType<typeof getHelpers>;
