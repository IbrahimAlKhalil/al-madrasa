import getDatabase from "../index";
import env from "../../env";
import {Knex} from "knex";

export async function getChildDatabases(): Promise<Knex[]> {
	const masterDB = getDatabase();

	const institutes = await masterDB('institute')
		.select('db_name');

	const databases = institutes
		.map(institute => getDatabase(institute.db_name, {database: institute.db_name}));

	databases.push(getDatabase('template', {database: env.DB_TEMPLATE}));

	return databases;
}
