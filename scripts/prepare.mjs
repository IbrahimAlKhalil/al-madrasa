import {_import as importThemeMetadata, migrate as migrateThemeData} from './theme.mjs';
import {migrate as migrateDB} from './migrate.mjs';
import {logger} from './logger.mjs';
import pg from 'pg';

export async function prepare() {
    const config = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    };

    const dbCreator = new pg.Client(config);
    await dbCreator.connect();

    logger.info('Trying to create master database....');

    try {
        await dbCreator.query(`create database ${process.env.DB_DATABASE}`);
        logger.info('Success!');
    } catch (e) {
        logger.info('Master database already exists');
    }

    logger.info('Trying to create template database....');

    try {
        await dbCreator.query(`create database ${process.env.DB_TEMPLATE}`);
        logger.info('Success!');
    } catch (e) {
        logger.info('Template database already exists');
    }

    await dbCreator.end();

    const query = `
        select exists(
                       select *
                       from pg_catalog.pg_tables
                       where schemaname = 'public'
                         and tablename = 'directus_collections'
                   )
    `;

    const master = new pg.Client({...config, database: process.env.DB_DATABASE});

    await master.connect();

    if (!(await master.query(query)).rows[0].exists) {
        logger.info('Master database is empty, restoring dumpfile');

        const {restore} = await import('./restore.mjs');
        await restore('master');

        logger.info('Success!');
    }

    await master.end();

    const template = new pg.Client({...config, database: process.env.DB_TEMPLATE});

    await template.connect();

    if (!(await template.query(query)).rows[0].exists) {
        logger.info('Template database is empty, restoring dumpfile');

        const {restore} = await import('./restore.mjs');
        await restore('template');

        logger.info('Success!');
    }

    await template.end();

    logger.info('Running database migrations...');
    await migrateDB('latest');

    logger.info('Loading theme metadata...');
    await importThemeMetadata();

    logger.info('Migrating theme data...');
    await migrateThemeData();

    logger.info('*------- Prepared -------*')
}
