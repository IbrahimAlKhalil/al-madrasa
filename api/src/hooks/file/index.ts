import {isMasterOrTemplate} from "../../database/helpers/is-master-or-template";
import {syncItemDelete} from "../../database/helpers/sync-item-delete";
import {commonDeleteMaster} from "../app/common-delete-master";
import {UnprocessableEntityException} from "../../exceptions";
import {isTemplate} from "../../database/helpers/is-template";
import {commonCopyMaster} from "../app/common-copy-master";
import {syncItem} from "../../database/helpers/sync-item";
import {registerHook} from "../../utils/register-hook";
import getDatabase from "../../database";

export default registerHook((hook) => {
	hook.action('files.upload', commonCopyMaster);
	hook.action('files.update', commonCopyMaster);
	hook.action('files.delete', commonDeleteMaster);
	hook.filter('files.delete', async (payload, meta, ctx) => {
		if (isMasterOrTemplate(ctx.database)) {
			return payload;
		}

		const files = await ctx.database('directus_files')
			.select('id', 'read_only')
			.whereIn('id', payload);

		if (files.some(f => f.read_only)) {
			throw new UnprocessableEntityException(`You can't delete readonly files from a child application`);
		}

		return payload;
	});

	hook.action('files.upload', async (meta, ctx) => {
		await syncItem(meta, ctx.database, getDatabase('master'), isTemplate);
		await syncItem(meta, ctx.database, null, isTemplate);
	});
	hook.action('files.update', async (meta, ctx) => {
		await syncItem(meta, ctx.database, getDatabase('master'), isTemplate);
		await syncItem(meta, ctx.database, null, isTemplate);
	});
	hook.action('files.delete', async (meta, ctx) => {
		await syncItemDelete(meta, ctx.database, getDatabase('master'), isTemplate);
		await syncItemDelete(meta, ctx.database, null, isTemplate);
	});
});
