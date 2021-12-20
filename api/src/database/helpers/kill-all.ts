import getDatabase, {disconnectDatabase} from '../index';

export async function killAll(database: string) {
	await disconnectDatabase(database);

	return getDatabase().raw(`
		SELECT pg_terminate_backend(pg_stat_activity.pid)
		FROM pg_stat_activity
		WHERE pg_stat_activity.datname = ?
		  AND pid <> pg_backend_pid();
	`, [database]);
}

