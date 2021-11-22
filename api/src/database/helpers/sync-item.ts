import {ActionHandler} from "../../types";
import getDatabase from "../../database";
import {isMaster} from "./is-master";
import { isEqual} from "lodash";
import env from "../../env";

export const syncItem: ActionHandler = async (meta, context) => {
	if (!isMaster(context.database)) {
		return;
	}

	const masterDB = getDatabase();

	const institutes = await masterDB('institute')
		.select('db_name');

	const id = meta.key ?? meta.keys[0];

	institutes.push({
		db_name: env.DB_TEMPLATE,
	});

	const item = await masterDB(meta.collection)
		.where('id', id)
		.first();

	if (!item) {
		return;
	}

	for (const institute of institutes) {
		const knex = getDatabase(institute.db_name, {database: institute.db_name});

		const hasItem = await knex(meta.collection)
			.where('id', id)
			.first();

		if (hasItem) {
			if (isEqual(hasItem, item)) {
				continue;
			}

			await knex(meta.collection)
				.update(item)
				.where('id', id);
			continue;
		}

		await knex(meta.collection)
			.insert(item);
	}
}
