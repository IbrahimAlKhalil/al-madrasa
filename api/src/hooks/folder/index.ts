import {commonDeleteMaster} from "../app/common-delete-master";
import {commonCopyMaster} from "../app/common-copy-master";
import {registerHook} from "../../utils/register-hook";
import {isMaster} from "../../database/helpers/is-master";
import {isTemplate} from "../../database/helpers/is-template";
import {UnprocessableEntityException} from "../../exceptions";

export default registerHook((hook) => {
	hook.action('folders.create', commonCopyMaster);
	hook.action('folders.update', commonCopyMaster);
	hook.action('folders.delete', commonDeleteMaster);
	hook.filter('folders.delete', async (payload, meta, ctx) => {
		if (isMaster(ctx.database)) {
			return payload;
		}

		if (isTemplate(ctx.database)) {
			throw new UnprocessableEntityException(`Media manager in the Template application is readonly`);
		}

		const files = await ctx.database('directus_folders')
			.select('id', 'read_only')
			.whereIn('id', payload);

		if (files.some(f => f.read_only)) {
			throw new UnprocessableEntityException(`You can't delete readonly folders from a child application`);
		}

		return payload;
	});
});
