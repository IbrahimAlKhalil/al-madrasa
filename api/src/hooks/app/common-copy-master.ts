import {syncItem} from "../../database/helpers/sync-item";
import {isMaster} from "../../database/helpers/is-master";
import getDatabase from "../../database";
import {HookContext} from "../../types";

export async function commonCopyMaster(meta: Record<string, any>, ctx: HookContext) {
	if (!isMaster(ctx.database)) {
		return;
	}

	await syncItem(meta, getDatabase('master'), null);
}
