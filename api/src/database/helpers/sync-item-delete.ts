import {getChildDatabases} from "./get-child-databases";
import {isDBSameAs} from "./is-db-same-as";
import {ValidateDB} from "../types/validate-db";
import {Knex} from "knex";

async function remove(ids: (string | number)[], table: string, targetDB: Knex) {
	return targetDB(table)
		.delete()
		.whereIn('id', ids);
}

export const syncItemDelete = async (meta: Record<string, any>, sourceDB: Knex, targetDB?: Knex | null, validateSourceDB?: ValidateDB) => {
	const shouldRun = typeof validateSourceDB === 'function' ? await validateSourceDB(sourceDB) : true;

	if (!shouldRun) return;

	let targetDBS = await getChildDatabases();

	if (targetDB) {
		targetDBS = [targetDB];
	}

	for (const _targetDB of targetDBS) {
		if (isDBSameAs(sourceDB, _targetDB)) {
			continue;
		}

		await remove(meta.payload, meta.collection, _targetDB);
	}
}
