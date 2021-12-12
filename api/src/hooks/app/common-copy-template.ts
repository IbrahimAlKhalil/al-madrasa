import {isTemplate} from '../../database/helpers/is-template';
import {syncItem} from '../../database/helpers/sync-item';
import {HookContext} from '../../types';

export async function commonCopyTemplate(meta: Record<string, any>, ctx: HookContext) {
	syncItem(meta, ctx.database, null, isTemplate);
}
