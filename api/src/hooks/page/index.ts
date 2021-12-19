import {commonDeleteMaster} from '../app/common-delete-master';
import {commonCopyMaster} from '../app/common-copy-master';
import {registerHook} from '../../utils/register-hook';
import {promises as fs} from 'fs';
import env from '../../env';
import path from 'path';

export default registerHook((hook) => {
	hook.action('theme_page.items.create', commonCopyMaster);
	hook.action('theme_page.items.update', commonCopyMaster);
	hook.action('theme_page.items.delete', commonDeleteMaster);

	if (env.NODE_ENV === 'development') {
		hook.action('theme_page.items.create', async (meta) => {
			const metadataPath = path.resolve(__dirname, `../../../../themes/${meta.payload.theme}/metadata`);
			await fs.mkdir(`${metadataPath}/${meta.key}`);
			await fs.writeFile(`${metadataPath}/${meta.key}/index.json`, JSON.stringify(meta.payload, null, 2), {
				encoding: 'utf-8'
			});
		});
		hook.action('theme_page.items.update', async (meta, ctx) => {
			const page = await ctx.database
				.from('theme_page')
				.where('id', meta.keys[0])
				.first();

			const metadataPath = path.resolve(__dirname, `../../../../themes/${page.theme}/metadata`);

			await fs.writeFile(`${metadataPath}/${page.id}/index.json`, JSON.stringify(page, null, 2), {
				encoding: 'utf-8'
			});
		});
		hook.filter('theme_page.items.delete', async (keys, meta, ctx) => {
			const pages = await ctx.database
				.from('theme_page')
				.whereIn('id', keys);

			for (const page of pages) {
				const metadataPath = path.resolve(__dirname, `../../../../themes/${page.theme}/metadata`);

				await fs.rm(`${metadataPath}/${page.id}`, {
					recursive: true,
					force: true,
				});
			}
		});
	}
});
