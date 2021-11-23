import {getChildDatabases} from "./get-child-databases";
import {isDBSameAs} from "./is-db-same-as";
import {ValidateDB} from "../types/validate-db";
import {isEqual} from "lodash";
import {Knex} from "knex";

async function copy(item: Record<string, any>, table: string, targetDB: Knex) {
	const hasItem = await targetDB(table)
		.where('id', item.id)
		.first();

	if (hasItem) {
		if (isEqual(hasItem, item)) {
			return;
		}

		await targetDB(table)
			.update(item)
			.where('id', item.id);
		return;
	}

	await targetDB(table)
		.insert(item)
		.onConflict()
		.ignore();
}

export const syncItem = async (meta: Record<string, any>, sourceDB: Knex, targetDB?: Knex | null, validateSourceDB?: ValidateDB) => {
	debugger;

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
