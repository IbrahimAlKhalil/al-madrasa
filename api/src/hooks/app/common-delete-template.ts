import {syncItemDelete} from "../../database/helpers/sync-item-delete";
import {isTemplate} from '../../database/helpers/is-template';
import {isMaster} from '../../database/helpers/is-master';
import getDatabase from '../../database';
import {HookContext} from "../../types";

export async function commonDeleteTemplate(meta: Record<string, any>, ctx: HookContext) {
	const database = isMaster(ctx.database) ? getDatabase() : getDatabase(ctx.database.client.config.connection.database);

	await syncItemDelete(meta, database, null, isTemplate);
}
