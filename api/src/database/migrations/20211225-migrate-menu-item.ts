import {Knex} from 'knex';

export const CHILD_ONLY = true;

export async function up(knex: Knex): Promise<void> {
	const menus = await knex.table('menu')
		.select('id', 'items');

	function modify(items: any[]) {
		return items.map((item: any) => {
			const children: any[] = Array.isArray(item.children) && item.children.length > 0 ? modify(item.children) : [];

			return {
				id: item.id,
				link: {
					type: 'custom',
					url: item.link,
					label: item.label,
					icon: item.icon,
				},
				children
			};
		});
	}

	for (const menu of menus) {
		menu.items = JSON.stringify(modify(menu.items));

		await knex.table('menu')
			.update(menu)
			.where('id', menu.id);
	}
}

export async function down(knex: Knex): Promise<void> {
	const menus = await knex.table('menu')
		.select('id', 'items');

	function modify(items: any[]) {
		return items.map((item: any) => {
			const children: any[] = Array.isArray(item.children) && item.children.length > 0 ? modify(item.children) : [];

			return {
				id: item.id,
				label: item.link.label,
				link: item.link.url,
				icon: item.link.icon,
				children
			};
		});
	}

	for (const menu of menus) {
		menu.items = JSON.stringify(modify(menu.items));

		await knex.table('menu')
			.update(menu)
			.where('id', menu.id);
	}
}


