import {syncItemDelete} from "../../database/helpers/sync-item-delete";
import {isMaster} from "../../database/helpers/is-master";
import getDatabase from "../../database";
import {HookContext} from "../../types";

export async function commonDeleteMaster(meta: Record<string, any>, ctx: HookContext) {
	if (!isMaster(ctx.database)) {
		return;
	}

	await syncItemDelete(meta, getDatabase('master'), null);
}
