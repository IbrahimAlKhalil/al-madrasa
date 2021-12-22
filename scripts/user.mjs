import {logger} from './logger.mjs';
import crypto from 'crypto';
import knex from 'knex';

let database;

function getDatabase() {
    if (database) {
        return database;
    }

    database = knex({
        client: process.env.DB_CLIENT,
        connection: {
            database: process.env.DB_DATABASE,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        }
    });

    return database;
}

function getAdminRole() {
    return getDatabase().table('directus_roles')
        .where('admin_access', true)
        .andWhere('name', 'Administrator')
        .first();
}

export async function createAdmin(email) {
    const database = getDatabase();
    const role = await getAdminRole();

    try {
        await database.table('directus_users')
            .insert({
                id: crypto.randomUUID(),
                role: role.id,
                email
            });
    } catch (e) {
        logger.error('Admin already exists');
    } finally {
        database.destroy();
    }
}

export async function createBot(email) {
    const database = getDatabase();
    const role = await getAdminRole();

    try {
        const token = crypto.randomBytes(5).toString('hex');

        await database.table('directus_users')
            .insert({
                id: crypto.randomUUID(),
                first_name: 'Al-Madrasah',
                role: role.id,
                token,
                email
            });

        logger.info(`Token: ${token}`);
    } catch (e) {
        logger.error('Bot already exists');
    } finally {
        database.destroy();
    }
}
