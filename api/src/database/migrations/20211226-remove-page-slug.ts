import {Knex} from 'knex';

export const CHILD_ONLY = true;

export async function up(knex: Knex): Promise<void> {
	await knex.schema.raw(`
		alter table page
			alter column id type varchar(300) using id::varchar(300);

		alter table page
			alter column id drop default;

		drop sequence page_id_seq;

		alter table page
			drop column slug;
	`);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.raw(`
		create sequence page_id_seq as integer;
		alter table page alter column id type integer using id::integer;
		alter table page alter column id set default nextval('public.page_id_seq'::regclass);
		alter sequence page_id_seq owned by page.id;
		alter table page
		add slug text not null;
		create unique index page_slug_uindex on page (slug);
	`);
}


