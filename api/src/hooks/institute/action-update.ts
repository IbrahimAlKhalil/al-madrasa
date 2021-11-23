import getDatabase, {disconnectDatabase} from "../../database";
import {isMaster} from "../../database/helpers/is-master";
import {ActionHandler, SchemaOverview} from "../../types";
import {ItemsService} from "../../services";

export const actionUpdate: ActionHandler = async (meta, context) => {
	if (!isMaster(context.database)) {
		return;
	}

	const instituteService = new ItemsService('institute', {
		knex: context.database,
		schema: context.schema as SchemaOverview,
	});

	const institutes = await instituteService.readMany(meta.keys, {
		fields: ['id', 'db_name', 'status'],
	});

	for (const institute of institutes) {
		if (institute.status === 'archived') {
			await disconnectDatabase(institute.db_name);
			continue;
		}

		getDatabase(institute.db_name, {
			database: institute.db_name,
		});
	}
}
