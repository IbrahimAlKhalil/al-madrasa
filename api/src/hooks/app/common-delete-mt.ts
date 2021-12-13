import {isMasterOrTemplate} from "../../database/helpers/is-master-or-template";
import {syncItemDelete} from "../../database/helpers/sync-item-delete";
import {isMaster} from "../../database/helpers/is-master";
import getDatabase from "../../database";
import {HookContext} from "../../types";

export async function commonDeleteMT(meta: Record<string, any>, ctx: HookContext) {
	const database = isMaster(ctx.database) ? getDatabase() : getDatabase(ctx.database.client.config.connection.database);

	await syncItemDelete(meta, database, null, isMasterOrTemplate);
}
