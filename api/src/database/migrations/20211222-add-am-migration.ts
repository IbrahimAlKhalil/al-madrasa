import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('am_migration', (table) => {
		table.string('id', 255)
			.primary();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('am_migration');
}


