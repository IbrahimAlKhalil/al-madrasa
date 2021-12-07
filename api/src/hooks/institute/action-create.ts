import getDatabase, {disconnectDatabase} from "../../database";
import {isMaster} from "../../database/helpers/is-master";
import {ActionHandler, SchemaOverview} from "../../types";
import {ItemsService} from "../../services";
import env from "../../env";
import {killAll} from "../../database/helpers/kill-all";

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
	} catch (e) {
		console.log(e);
	} finally {
		getDatabase('template', {database: 'template'});
	}

	if (institute.status === 'archived') {
		await disconnectDatabase(institute.db_name);
	}
}