import {syncItemDelete} from "../../database/helpers/sync-item-delete";
import {isTemplate} from '../../database/helpers/is-template';
import getDatabase from '../../database';
import {HookContext} from "../../types";

export async function commonDeleteTemplate(meta: Record<string, any>, ctx: HookContext) {
	if (!isTemplate(ctx.database)) {
		return;
	}

	await syncItemDelete(meta, getDatabase('template'), null, isTemplate);
}
