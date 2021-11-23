import {isMaster} from "../../database/helpers/is-master";
import {FilterHandler, SchemaOverview} from "../../types";
import {killAll} from "../../database/helpers/kill-all";
import {ItemsService} from "../../services";

export const filterDelete: FilterHandler = async (payload, meta, context) => {
	if (!isMaster(context.database)) {
		return payload;
	}

	const instituteService = new ItemsService('institute', {
		knex: context.database,
		schema: context.schema as SchemaOverview,
	});

	for (const instituteId of payload) {
		const institute = await instituteService.readOne(instituteId);

		await killAll(institute.db_name);

		await context.database.raw(`drop database if exists "${institute.db_name}"`);
	}

	return payload;
}
