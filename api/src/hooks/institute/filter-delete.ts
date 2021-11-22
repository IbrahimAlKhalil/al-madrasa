import {isMaster} from "../../database/helpers/is-master";
import {FilterHandler, SchemaOverview} from "../../types";
import {disconnectDatabase} from "../../database";
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

		await disconnectDatabase(institute.db_name);

		await context.database.raw(`
			SELECT pg_terminate_backend(pg_stat_activity.pid)
			FROM pg_stat_activity
			WHERE pg_stat_activity.datname = ?
			  AND pid <> pg_backend_pid();
		`, [institute.db_name]);

		await context.database.raw(`drop database if exists "${institute.db_name}"`);
	}

	return payload;
}
