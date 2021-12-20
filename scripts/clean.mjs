import pg from "pg";

async function run(database) {
    const client = new pg.Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database,
    });
    await client.connect();

    const result = await client.query(`
        select table_name
        from information_schema.tables
        where table_schema = 'public'
          and table_type = 'BASE TABLE'
    `);

    const excluded = new Set([
        'spatial_ref_sys',
        'theme',
        'theme_page',
        'theme_page_section',
        'directus_collections',
        'directus_fields',
        'directus_relations',
        'directus_migrations',
        'directus_dashboards',
        'directus_panels',
        'directus_roles',
        'directus_permissions',
    ]);

    const tables = result.rows
        .filter(r => !excluded.has(r.table_name))
        .map(r => r.table_name);

    for (const table of tables) {
        await client.query(`TRUNCATE "public"."${table}" RESTART IDENTITY CASCADE`);
    }

    await client.end();
}

export async function clean(database) {
    switch (database) {
        case 'master':
            await run(process.env.DB_DATABASE);
            break;
        case 'template':
            await run(process.env.DB_TEMPLATEl);
            break;
        default:
            await run(process.env.DB_DATABASE);
            await run(process.env.DB_TEMPLATE);
    }
}
