import env from "../../env";
import {Knex} from "knex";

export function isTemplate(database: Knex) {
	return database.client.config.connection.database === env.DB_TEMPLATE;
}
