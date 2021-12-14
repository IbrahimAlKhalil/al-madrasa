import {Knex} from 'knex';

const columns = ['uploaded_by', 'modified_by'];

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('directus_files', (table) => {
		for (const column of columns) {
			table.dropForeign(column, `directus_files_${column}_foreign`);

			table.foreign(column, `directus_files_${column}_foreign`)
				.references('id')
				.inTable('directus_users')
				.onUpdate('cascade')
				.onDelete('set null');
		}
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('directus_files', (table) => {
		for (const column of columns) {
			table.dropForeign(column, `directus_files_${column}_foreign`);

			table.foreign(column, `directus_files_${column}_foreign`)
				.references('id')
				.inTable('directus_users')
		}
	});
}


