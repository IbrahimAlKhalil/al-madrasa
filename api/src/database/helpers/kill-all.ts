import getDatabase, {disconnectDatabase} from "../index";
import {Knex} from "knex";

export async function killAll(database: Knex | string) {
	const databaseName = typeof database === 'string' ? database : database.client.config.connection.database;

	await disconnectDatabase(databaseName);

	return getDatabase().raw(`
			SELECT pg_terminate_backend(pg_stat_activity.pid)
			FROM pg_stat_activity
			WHERE pg_stat_activity.datname = ?
			  AND pid <> pg_backend_pid();
		`, [databaseName]);
}

