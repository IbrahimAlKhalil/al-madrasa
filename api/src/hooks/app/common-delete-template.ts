import {syncItemDelete} from "../../database/helpers/sync-item-delete";
import {isTemplate} from '../../database/helpers/is-template';
import {HookContext} from "../../types";

export async function commonDeleteTemplate(meta: Record<string, any>, ctx: HookContext) {
	syncItemDelete(meta, ctx.database, null, isTemplate);
}
