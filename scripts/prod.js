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

    const config = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    };

    const dbCreator = new pg.Client(config);

    await dbCreator.connect();

    try {
        await databaseCreator.query(`create database ${process.env.DB_DATABASE}`);
    } catch (e) {
    }

    try {
        await databaseCreator.query(`create database ${process.env.DB_TEMPLATE}`);
    } catch (e) {
    }

    await dbCreator.end();

    const master = new pg.Client({...config, database: process.env.DB_DATABASE});

    const result = await master.query(`
        select exists(
                       select *
                       from pg_catalog.pg_tables
                       where schemaname = 'public'
                         and tablename = 'directus_collections'
                   )
    `);

    if (result.rows[0].exists) {
        await master.end();

        return runApp();
    }

    require('./scripts/restore');

    await master.end();
    await runApp();
}

start();
