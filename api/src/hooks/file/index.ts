import {commonDeleteMaster} from "../app/common-delete-master";
import {UnprocessableEntityException} from "../../exceptions";
import {isTemplate} from "../../database/helpers/is-template";
import {commonCopyMaster} from "../app/common-copy-master";
import {isMaster} from "../../database/helpers/is-master";
import {registerHook} from "../../utils/register-hook";

export default registerHook((hook) => {
	hook.action('files.upload', commonCopyMaster);
	hook.action('files.update', commonCopyMaster);
	hook.action('files.delete', commonDeleteMaster);
	hook.filter('files.delete', async (payload, meta, ctx) => {
		if (isMaster(ctx.database)) {
			return payload;
		}

		if (isTemplate(ctx.database)) {
			throw new UnprocessableEntityException(`Media manager in the Template application is readonly`);
		}

		const files = await ctx.database('directus_files')
			.select('id', 'read_only')
			.whereIn('id', payload);

		if (files.some(f => f.read_only)) {
			throw new UnprocessableEntityException(`You can't delete readonly files from a child application`);
		}

		return payload;
	});
});
