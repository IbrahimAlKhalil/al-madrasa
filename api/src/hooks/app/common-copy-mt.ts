import {isMasterOrTemplate} from "../../database/helpers/is-master-or-template";
import {syncItem} from "../../database/helpers/sync-item";
import {isMaster} from "../../database/helpers/is-master";
import getDatabase from "../../database";
import {HookContext} from "../../types";

export async function commonCopyMT(meta: Record<string, any>, ctx: HookContext) {
	if (!isMasterOrTemplate(ctx.database)) {
		return;
	}

	const database = isMaster(ctx.database) ? getDatabase('master') : getDatabase('template');

	await syncItem(meta, database, null);
}
