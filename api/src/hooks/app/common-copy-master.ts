import {syncItem} from "../../database/helpers/sync-item";
import {isMaster} from "../../database/helpers/is-master";
import getDatabase from "../../database";
import {HookContext} from "../../types";

export async function commonCopyMaster(meta: Record<string, any>, ctx: HookContext) {
	const database = isMaster(ctx.database) ? getDatabase() : getDatabase(ctx.database.client.config.connection.database);

	await syncItem(meta, database, null, isMaster);
}
