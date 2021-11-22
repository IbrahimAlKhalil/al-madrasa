import {syncTable} from "../../database/helpers/sync-table";
import {syncUsers} from "../../database/helpers/sync-users";
import {getSchema} from "../../utils/get-schema";
import {ItemsService} from "../../services";
import getDatabase from "../../database";
import {InitHandler} from "../../types";
import env from "../../env";

export const initApp: InitHandler = async () => {
	const database = getDatabase();
	const schema = await getSchema({database});

	const instituteService = new ItemsService('institute', {
		knex: database,
		schema,
	});

	const institutes = await instituteService.readByQuery({
		fields: ['db_name']
	});

	institutes.push({
		db_name: env.DB_TEMPLATE,
	});

	for (const institute of institutes) {
		const db = getDatabase(institute.db_name);

		await syncTable(
			db,
			'directus_roles',
			['id', 'name', 'icon', 'description', 'ip_access', 'enforce_tfa', 'admin_access', 'app_access']
		);

		await syncUsers(db);

		await syncTable(
			db,
			'theme',
			['id', 'name'],
		);

		await syncTable(
			db,
			'theme_page',
			['id', 'name', 'icon', 'theme'],
		);

		await syncTable(
			db,
			'theme_page_section',
			['id', 'name', 'icon', 'page', 'sortable', 'sort', 'fields', 'can_hide'],
		);
	}
};
