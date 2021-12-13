import {isTemplate} from '../../database/helpers/is-template';
import {syncItem} from '../../database/helpers/sync-item';
import {isMaster} from '../../database/helpers/is-master';
import {HookContext} from '../../types';
import getDatabase from '../../database';

export async function commonCopyTemplate(meta: Record<string, any>, ctx: HookContext) {
	const database = isMaster(ctx.database) ? getDatabase() : getDatabase(ctx.database.client.config.connection.database);

	await syncItem(meta, database, null, isTemplate);
}
