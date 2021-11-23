import getDatabase from "../index";
import env from "../../env";
import {Knex} from "knex";

export async function getChildDatabases(): Promise<Knex[]> {
	const masterDB = getDatabase();

	const institutes = await masterDB('institute')
		.select('db_name');

	return institutes
		.concat({db_name: env.DB_TEMPLATE})
		.map(institute => getDatabase(institute.db_name, {database: institute.db_name}));
}
