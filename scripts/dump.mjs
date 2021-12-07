import path, {dirname} from "path";
import {fileURLToPath} from 'url';
import crypto from "crypto";
import execa from "execa";
import pg from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function run(database, filename) {
    const dumpFlags = [
        `--username=${process.env.DB_USER}`,
        `--host=${process.env.DB_HOST}`,
        `--port=${process.env.DB_PORT}`,
        '--format=plain',
        '--no-owner',
        '--no-privileges',
        '--no-acl',
        '--inserts',
        '--quote-all-identifiers',
        '--no-password',
    ];
    const restoreFlags = [
        `--username=${process.env.DB_USER}`,
        `--host=${process.env.DB_HOST}`,
        `--port=${process.env.DB_PORT}`,
        '--no-password',
    ];
    const spawnOptions = {
        env: {
            PGPASSWORD: process.env.DB_PASSWORD,
        },
        shell: true,
        stdio: 'inherit'
    };

    execa.sync('pg_dump', [
        ...dumpFlags,
        `--dbname=${database}`,
        `--file=${path.resolve(__dirname, `../database/${filename}`)}`
    ], spawnOptions);

    const tempDBName = `am_temp_${crypto.randomBytes(4).toString('hex')}`;

    const masterClient = new pg.Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });
    await masterClient.connect();
    await masterClient.query(`
      CREATE DATABASE "${tempDBName}"
      WITH
      OWNER = "${process.env.DB_USER}"
      ENCODING = 'UTF8'
      CONNECTION LIMIT = -1;
    `);

    execa.sync('psql', [
        ...restoreFlags,
        `--dbname=${tempDBName}`,
        `--file=${path.resolve(__dirname, `../database/${filename}`)}`,
    ], {
        ...spawnOptions,
        stdio: 'ignore',
    });

    const tempClient = new pg.Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: tempDBName,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });
    await tempClient.connect();

    const result = await tempClient.query(`
        select table_name
        from information_schema.tables
        where table_schema = 'public'
          and table_type = 'BASE TABLE'
    `);

    const excluded = new Set(['spatial_ref_sys']);

    const tables = result.rows
        .filter(r => !r.table_name.startsWith('directus_'))
        .filter(r => !excluded.has(r.table_name))
        .map(r => r.table_name);

    tables.push('directus_activity', 'directus_revisions', 'directus_sessions', 'directus_users', 'directus_roles', 'directus_files');

    for (const table of tables) {
        await tempClient.query(`TRUNCATE "public"."${table}" RESTART IDENTITY CASCADE`);
    }

    await tempClient.end();

    execa.sync('pg_dump', [
        ...dumpFlags,
        `--dbname=${tempDBName}`,
        `--file=${path.resolve(__dirname, `../database/${filename}`)}`
    ], spawnOptions);

    await masterClient.query(`drop database ${tempDBName}`);
    await masterClient.end();
}

export async function dump(database) {
    switch (database) {
        case 'master':
            await run(process.env.DB_DATABASE, 'master.sql');
            break;
        case 'template':
            await run(process.env.DB_TEMPLATE, 'template.sql');
            break;
        default:
            await run(process.env.DB_DATABASE, 'master.sql');
            await run(process.env.DB_TEMPLATE, 'template.sql');
    }
}
