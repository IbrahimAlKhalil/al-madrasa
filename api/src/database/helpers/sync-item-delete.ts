import {ActionHandler} from "../../types";
import getDatabase from "../../database";
import {isMaster} from "./is-master";
import env from "../../env";

export const syncItemDelete: ActionHandler = async (meta, context) => {
	if (!isMaster(context.database)) {
		return;
	}

	const masterDB = getDatabase();

	const institutes = await masterDB('institute')
		.select('db_name');

	institutes.push({
		db_name: env.DB_TEMPLATE,
	});

	for (const institute of institutes) {
		const knex = getDatabase(institute.db_name, {database: institute.db_name});

		await knex(meta.collection)
			.delete()
			.whereIn('id', meta.payload);
	}
}
