import {build} from './build.mjs';
import knex from 'knex';

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

export async function migrate(direction, master , children) {
    await build(true);

    const run = await import('../api/dist/database/migrations/run.js');
    const databases = await getDatabases();

    async function runChildren() {
        await run.default.default(databases.template, direction);

        for (const institute of databases.institutes) {
            await run.default.default(institute, direction);
        }

        for (const institute of databases.institutes) {
            await institute.destroy();
        }

        await databases.master.destroy();
        await databases.template.destroy();
    }

    if (!master && !children) {
        await run.default.default(databases.master, direction);
        await runChildren();
    }

    if (master) {
        await run.default.default(databases.master, direction);
    }

    if (children) {
        await runChildren();
    }
}
