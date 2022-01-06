import {isTemplate} from '../../database/helpers/is-template';
import {syncItem} from '../../database/helpers/sync-item';
import {HookContext} from '../../types';
import getDatabase from '../../database';

export async function commonCopyTemplate(meta: Record<string, any>, ctx: HookContext) {
	if (!isTemplate(ctx.database)) {
		return;
	}

	await syncItem(meta, getDatabase('template'), null);
}
