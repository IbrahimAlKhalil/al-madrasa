import {isDBSameAs} from "./is-db-same-as";
import getDatabase from "../index";
import {isEqual, isObject, mapValues} from "lodash";
import {Knex} from "knex";

function sanitize(item: Record<string, any>) {
	return mapValues(item, i => isObject(i) ? JSON.stringify(i) : i);
}

export async function syncTable(sourceDB: Knex | string, targetDB: Knex | string, table: string, fields: string[]) {
	sourceDB = typeof sourceDB === 'string' ? getDatabase(sourceDB) : sourceDB;
	targetDB = typeof targetDB === 'string' ? getDatabase(targetDB) : targetDB;

	if (isDBSameAs(sourceDB, targetDB)) {
		return;
	}


	const items = (
		await sourceDB(table)
			.select(fields)
	).map(sanitize);

	for (const item of items) {
		let existing = await targetDB(table)
			.select(fields)
			.where('id', item.id)
			.first();

		if (existing) {
			existing = sanitize(existing);

			if (isEqual(existing, item)) {
				continue;
			}

			await targetDB(table)
				.update(item)
				.where('id', item.id);

			continue;
		}

		await targetDB(table)
			.insert(item)
			.onConflict('id')
			.merge(fields);
	}
}

