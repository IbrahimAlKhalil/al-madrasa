import {syncTable} from "../../database/helpers/sync-table";
import getDatabase from "../../database";
import {InitHandler} from "../../types";
import env from "../../env";

export const initApp: InitHandler = async () => {
	const masterDB = getDatabase();
	const templateDB = getDatabase('template',
		{database: env.DB_TEMPLATE});

	const institutes = await masterDB('institute')
		.select('db_name');

	institutes.push({
		db_name: env.DB_TEMPLATE,
	});

	const roleCols = [
		'id',
		'name',
		'icon',
		'description',
		'ip_access',
		'enforce_tfa',
		'admin_access',
		'app_access'
	];
	const permCols = [
		'id',
		'role',
		'collection',
		'action',
		'permissions',
		'validation',
		'presets',
		'fields'
	];
	const userCols = [
		'id',
		'email',
		'password',
		'status',
		'avatar',
		'role',
		'first_name',
		'last_name',
		'location',
		'title',
		'description',
		'tags',
		'auth_data',
		'token'
	];
	const fileCols = [
		'id',
		'storage',
		'filename_disk',
		'filename_download',
		'title',
		'type',
		'folder',
		'uploaded_by',
		'modified_by',
		'modified_on',
		'charset',
		'filesize',
		'width',
		'height',
		'duration',
		'embed',
		'description',
		'location',
		'tags',
		'metadata',
		'read_only'
	];

	await syncTable(
		masterDB,
		templateDB,
		'directus_roles',
		roleCols,
	);

	await syncTable(
		masterDB,
		templateDB,
		'directus_folders',
		['id', 'name', 'parent', 'read_only']
	);

	await syncTable(
		masterDB,
		templateDB,
		'directus_files',
		fileCols,
	);

	await syncTable(
		masterDB,
		templateDB,
		'directus_users',
		userCols,
	);

	for (const institute of institutes) {
		const instituteDB = getDatabase(institute.db_name);

		await syncTable(
			templateDB,
			instituteDB,
			'directus_roles',
			roleCols,
		);

		await syncTable(
			templateDB,
			instituteDB,
			'directus_permissions',
			permCols,
		);

		await syncTable(
			templateDB,
			instituteDB,
			'directus_folders',
			['id', 'name', 'parent', 'read_only']
		);

		await syncTable(
			masterDB,
			instituteDB,
			'directus_files',
			fileCols
		);

		await syncTable(
			masterDB,
			instituteDB,
			'directus_users',
			userCols,
		);

		await syncTable(
			masterDB,
			instituteDB,
			'theme',
			['id', 'name'],
		);

		await syncTable(
			masterDB,
			instituteDB,
			'theme_page',
			['id', 'name', 'icon', 'theme'],
		);

		await syncTable(
			masterDB,
			instituteDB,
			'theme_page_section',
			[
				'id',
				'name',
				'icon',
				'page',
				'sortable',
				'sort',
				'fields',
				'can_hide'
			],
		);
	}
};
