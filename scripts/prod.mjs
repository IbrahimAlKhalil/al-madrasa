import pg from "pg";

export async function prod() {
    const config = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    };

    const dbCreator = new pg.Client(config);
    await dbCreator.connect();

    try {
        await dbCreator.query(`create database ${process.env.DB_DATABASE}`);
    } catch (e) {
    }

    try {
        await dbCreator.query(`create database ${process.env.DB_TEMPLATE}`);
    } catch (e) {
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

    if (!(await master.query(query)).rows[0].exists) {
        const {restore} = await import('./restore.mjs');
        await restore('master');
        await master.end();
    }

    const template = new pg.Client({...config, database: process.env.DB_TEMPLATE});

    if (!(await template.query(query)).rows[0].exists) {
        const {restore} = await import('./restore.mjs');
        await restore('template');
        await template.end();
    }

    import('../api/dist/server').then( mod => mod.startServer());
}
