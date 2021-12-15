import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import execa from 'execa';
import pg from 'pg';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runExport(database, filename) {
    if (!fs.existsSync(path.resolve(__dirname, `../metadata`))) {
        fs.mkdirSync(path.resolve(__dirname, `../metadata`));
    }

    const dumpFlags = [
        `--username=${process.env.DB_USER}`,
        `--host=${process.env.DB_HOST}`,
        `--port=${process.env.DB_PORT}`,
        '--format=tar',
        '--no-owner',
        '--no-privileges',
        '--no-acl',
        '--inserts',
        '--quote-all-identifiers',
        '--no-password',
        '--data-only',
        `--dbname=${database}`,
        `--table='(directus_collections|directus_fields|directus_relations)'`,
        `--file=${path.resolve(__dirname, `../metadata/${filename}`)}`
    ];

    execa.sync('/usr/bin/pg_dump', dumpFlags, {
        env: {
            PGPASSWORD: process.env.DB_PASSWORD,
        },
        shell: true,
        stdio: 'inherit'
    });
}

async function runImport(database, filename) {
    const client = new pg.Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database,
    });
    await client.connect();

    const tables = ['directus_collections', 'directus_fields', 'directus_relations'];

    for (const table of tables) {
        await client.query(`TRUNCATE "public"."${table}" RESTART IDENTITY CASCADE`);
    }

    await client.end();

    execa.sync('/usr/bin/pg_restore', [
        path.resolve(__dirname, `../metadata/${filename}`),
        `--username=${process.env.DB_USER}`,
        `--host=${process.env.DB_HOST}`,
        `--port=${process.env.DB_PORT}`,
        '--no-password',
        '--disable-triggers',
        `--dbname=${database}`,
    ], {
        shell: true,
        stdio: 'inherit',
        env: {
            PGPASSWORD: process.env.DB_PASSWORD
        }
    });
}

export async function _export(database) {
    switch (database) {
        case 'master':
            await runExport(process.env.DB_DATABASE, 'master.tar');
            break;
        case 'template':
            await runExport(process.env.DB_TEMPLATE, 'template.tar');
            break;
        default:
            await runExport(process.env.DB_DATABASE, 'master.tar');
            await runExport(process.env.DB_TEMPLATE, 'template.tar');
    }
}

export async function _import(database) {
    switch (database) {
        case 'master':
            await runImport(process.env.DB_DATABASE, 'master.tar');
            break;
        case 'template':
            await runImport(process.env.DB_TEMPLATE, 'template.tar');
            break;
        default:
            await runImport(process.env.DB_DATABASE, 'master.tar');
            await runImport(process.env.DB_TEMPLATE, 'template.tar');
    }
}
