import {commonDeleteMaster} from '../app/common-delete-master';
import {commonCopyMaster} from '../app/common-copy-master';
import {registerHook} from '../../utils/register-hook';
import {promises as fs} from 'fs';
import {omit} from 'lodash';
import env from '../../env';
import path from 'path';

export default registerHook((hook) => {
	hook.action('theme_page_section.items.create', commonCopyMaster);
	hook.action('theme_page_section.items.update', commonCopyMaster);
	hook.action('theme_page_section.items.delete', commonDeleteMaster);

	if (env.NODE_ENV === 'development') {
		hook.action('theme_page_section.items.create', async (meta, ctx) => {
			const page = await ctx.database.from('theme_page')
				.where('id', meta.payload.page)
				.first();

			const metadataPath = path.resolve(__dirname, `../../../../themes/${page.theme}/metadata`);
			const sectionPath = `${metadataPath}/${page.id}/${meta.key}`;

			await fs.mkdir(sectionPath);
			await fs.mkdir(`${sectionPath}/fields`);

			await fs.writeFile(`${sectionPath}/index.json`, JSON.stringify(omit(meta.payload, 'fields'), null, 2), {
				encoding: 'utf-8'
			});

			for (const field of meta.payload.fields) {
				await fs.writeFile(`${sectionPath}/fields/${field.field}.json`, JSON.stringify(field, null, 2), {
					encoding: 'utf-8',
				});
			}
		});
		hook.action('theme_page_section.items.update', async (meta, ctx) => {
			const section = await ctx.database
				.from('theme_page_section')
				.where('id', meta.keys[0])
				.first();
			const page = await ctx.database
				.from('theme_page')
				.where('id', section.page)
				.first();

			const metadataPath = path.resolve(__dirname, `../../../../themes/${page.theme}/metadata`);
			const sectionPath = `${metadataPath}/${page.id}/${section.id}`;

			await fs.writeFile(`${sectionPath}/index.json`, JSON.stringify(omit(section, 'fields'), null, 2), {
				encoding: 'utf-8'
			});

			await fs.rm(`${sectionPath}/fields`, {
				recursive: true,
				force: true,
			});
			await fs.mkdir(`${sectionPath}/fields`);

			for (const field of section.fields) {
				await fs.writeFile(`${sectionPath}/fields/${field.field}.json`, JSON.stringify(field, null, 2), {
					encoding: 'utf-8',
				});
			}
		});
		hook.filter('theme_page_section.items.delete', async (keys, meta, ctx) => {
			const sections = await ctx.database
				.from('theme_page_section')
				.whereIn('id', keys);

			for (const section of sections) {
				const page = await ctx.database
					.from('theme_page')
					.where('id', section.page)
					.first();

				const metadataPath = path.resolve(__dirname, `../../../../themes/${page.theme}/metadata`);

				await fs.rm(`${metadataPath}/${page.id}/${section.id}`, {
					recursive: true,
					force: true,
				});
			}
		});
	}
});
