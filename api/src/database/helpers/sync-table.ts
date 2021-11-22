import getDatabase from "../index";
import {isEqual} from "lodash";
import {Knex} from "knex";

export async function syncTable(database: Knex | string, table: string, fields: string[]) {
	const masterDB = getDatabase();

	if (typeof database === 'string') {
		database = getDatabase(database);
	}

	const items = await masterDB(table)
		.select(fields);

	for (const item of items) {
		const has = await  database(table)
			.select(fields)
			.where('id', item.id)
			.first();

		if (has) {
			if (isEqual(has, item)) {
				continue;
			}

			await database(table)
				.update(item)
				.where('id', item.id);

			continue;
		}

		await database(table)
			.insert(item);
	}
}
