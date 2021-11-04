const pg = require('pg');

require('dotenv').config();

async function runApp() {
    process.argv.push('start');
    require('./cli');
}

async function start() {
    if (process.env.NODE_ENV === 'development') {
        console.error('This script is meant to be executed by docker');

        process.exit(1);
    }

    const client = new pg.Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    await client.connect();

    const result = await client.query(`
        select exists(
                       select *
                       from pg_catalog.pg_tables
                       where schemaname = 'public'
                         and tablename similar to 'directus_%'
                   )
    `);

    if (result.rows[0].exists) {
        await client.end();

        return runApp();
    }

    require('./scripts/restore');

    await client.end();
    await runApp();
}

start();
