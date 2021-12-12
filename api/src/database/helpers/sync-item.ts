import {getChildDatabases} from "./get-child-databases";
import {isEqual, isObject, mapValues} from "lodash";
import {ValidateDB} from "../types/validate-db";
import {isDBSameAs} from "./is-db-same-as";
import {Knex} from "knex";

function sanitize(item: Record<string, any>) {
	return mapValues(item, i => isObject(i) ? JSON.stringify(i) : i);
}

async function copy(item: Record<string, any>, table: string, targetDB: Knex) {
	let existing = await targetDB(table)
		.where('id', item.id)
		.first();

	if (existing) {
		existing = sanitize(existing);

		if (isEqual(existing, item)) {
			return;
		}

		await targetDB(table)
			.update(sanitize(item))
			.where('id', item.id);
		return;
	}

	await targetDB(table)
		.insert(sanitize(item))
		.onConflict()
		.ignore();
}

export const syncItem = async (meta: Record<string, any>, sourceDB: Knex, targetDB?: Knex | null, validateSourceDB?: ValidateDB) => {
	const shouldRun = typeof validateSourceDB === 'function' ? await validateSourceDB(sourceDB) : true;

	if (!shouldRun) return;

	const ids = meta.key ? [meta.key] : meta.keys;

	const items = await sourceDB(meta.collection)
		.whereIn('id', ids);

	if (items.length === 0) {
		return;
	}

	let targetDBS = await getChildDatabases();

	if (targetDB) {
		targetDBS = [targetDB];
	}

	for (const _targetDB of targetDBS) {
		if (isDBSameAs(sourceDB, _targetDB)) {
			continue;
		}

		for (const item of items) {
			await copy(item, meta.collection, _targetDB);
		}
	}
}
