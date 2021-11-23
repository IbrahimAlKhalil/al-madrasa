import {Knex} from "knex";

export function isDBSameAs(db1: Knex, db2: Knex) {
	return db1.client.config.connection.database === db2.client.config.connection.database;
}
