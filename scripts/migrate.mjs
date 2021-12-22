import {logger} from './logger.mjs';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import {promises as fs} from 'fs';
import {build} from './build.mjs';
import axios from 'axios';
import knex from 'knex';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getDatabases() {
    const connection = {
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    };

    const master = knex({
        client: process.env.DB_CLIENT,
        connection,
    });
    const template = knex({
        client: process.env.DB_CLIENT,
        connection: {
            ...connection,
            database: process.env.DB_TEMPLATE,
        },
    });

    let institutes = await master.from('institute')
        .select('db_name');

    institutes = institutes.map(institute => knex({
        client: process.env.DB_CLIENT,
        connection: {
            ...connection,
            database: institute.db_name,
        }
    }));

    return {master, template, institutes};
}

export async function migrate(direction, master, children) {
    logger.info('Compiling migration files');
    await build(true);

    const run = await import('../api/dist/database/migrations/run.js');
    const databases = await getDatabases();
    const metadataPath = path.resolve(__dirname, '../metadata');

    async function importMetadata(knex, database) {
        logger.info(`Importing metadata into ${knex.client.config.connection.database}`);

        const migrated = new Set((
            await knex
                .table('am_migration'))
            .map(m => m.id)
        );

        const migrations = await fs.readdir(metadataPath);

        for (const file of migrations) {
            const migration = JSON.parse(await fs.readFile(`${metadataPath}/${file}`, {encoding: 'utf-8'}));

            if (migration.database !== database) {
                continue;
            }

            const id = path.parse(file).name;

            if (migrated.has(id)) {
                continue;
            }

            logger.info(`Running ${id}`);

            const url = new URL(process.env.PUBLIC_URL);

            url.pathname = migration.url;
            url.search = `?do_not_save=true&access_token=${process.env.BOT_USER_TOKEN}`;

            await axios.request({
                url: url.toString(),
                method: migration.method,
                data: migration.data,
                headers: {
                    'X-Al-Mad-App': migration.database,
                },
            });

            await knex
                .table('am_migration')
                .insert({id});
        }
    }

    async function runChildren() {
        await run.default.default(databases.template, direction);
        await importMetadata(databases.template, 'template');

        for (const institute of databases.institutes) {
            await run.default.default(institute, direction);
            await importMetadata(institute, 'template');
        }
    }

    if (!master && !children) {
        await run.default.default(databases.master, direction);
        await importMetadata(databases.master, 'master');
        await runChildren();
    }

    if (master) {
        await run.default.default(databases.master, direction);
        await importMetadata(databases.master, 'master');
    }

    if (children) {
        await runChildren();
    }

    for (const institute of databases.institutes) {
        await institute.destroy();
    }

    await databases.master.destroy();
    await databases.template.destroy();
}
