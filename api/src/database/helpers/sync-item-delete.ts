import {getSchema} from "../../utils/get-schema";
import {ItemsService} from "../../services";
import {ActionHandler } from "../../types";
import getDatabase from "../../database";
import {isMaster} from "./is-master";
import env from "../../env";

export const syncItemDelete: ActionHandler = async (meta, context) => {
	if (!isMaster(context.database)) {
		return;
	}

	const masterDB = getDatabase();
	const masterSchema = await getSchema({ database: masterDB });

	const instituteService = new ItemsService('institute', {
		knex: masterDB,
		schema: masterSchema,
	});

	const institutes = await instituteService.readByQuery({
		fields: ['db_name']
	});

	institutes.push({
		db_name: env.DB_TEMPLATE,
	});

	for (const institute of institutes) {
		const knex = getDatabase(institute.db_name, { database: institute.db_name });
		const schema = await getSchema({ database: knex });

		const service = new ItemsService(meta.collection, {knex, schema});
		await service.deleteMany(meta.payload);
	}
}
