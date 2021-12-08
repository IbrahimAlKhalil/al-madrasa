import getDatabase, {disconnectDatabase} from '../../database';
import {isMaster} from '../../database/helpers/is-master';
import {ActionHandler, SchemaOverview} from '../../types';
import {killAll} from '../../database/helpers/kill-all';
import {ItemsService} from '../../services';
import env from '../../env';

export const actionCreate: ActionHandler = async (meta, context) => {
	debugger;
	if (!isMaster(context.database)) {
		return;
	}


	const instituteService = new ItemsService('institute', {
		knex: context.database,
		accountability: context.accountability,
		schema: context.schema as SchemaOverview,
	});

	const institute = await instituteService.readOne(meta.key);

	try {
		await killAll(env.DB_TEMPLATE);

		await context.database.raw(`
		   CREATE DATABASE "${institute.db_name}"
           WITH
           OWNER = "${env.DB_USER}"
           TEMPLATE = "${env.DB_TEMPLATE}"
           ENCODING = 'UTF8'
           CONNECTION LIMIT = -1;`
		);

		await getDatabase(institute.db_name, {
			database: institute.db_name,
		});
	} catch (e) {
		console.log(e);
	} finally {
		getDatabase('template', {database: env.DB_TEMPLATE});
	}

	if (institute.status === 'archived') {
		await disconnectDatabase(institute.db_name);
	}
};
