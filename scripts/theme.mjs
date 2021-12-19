import fsSync, {promises as fs} from 'fs';
import {logger} from './logger.mjs';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import lodash from 'lodash';
import execa from 'execa';
import knex from 'knex';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runExport(theme) {
    logger.info(`Theme: ${theme}`)

    const themePath = path.resolve(__dirname, `../themes/${theme}`);
    const metadataPath = `${themePath}/metadata`;

    if (fsSync.existsSync(metadataPath)) {
        await fs.rm(metadataPath, {
            force: true,
            recursive: true,
        });
    }

    await fs.mkdir(metadataPath);

    const client = knex({
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        }
    });

    const pages = await client.from('theme_page').where('theme', theme);

    for (const page of pages) {
        const pageId = page.id.replace(`${theme}-`, '');
        logger.info(`Page: ${pageId}`);

        const pagePath = `${metadataPath}/${page.id}`;
        await fs.mkdir(pagePath);

        await fs.writeFile(`${pagePath}/index.json`, JSON.stringify(page, null, 2), {
            encoding: 'utf-8',
        });

        const sections = await client.from('theme_page_section')
            .where('page', page.id);

        for (const section of sections) {
            logger.info(`Section: ${section.id.replace(`${theme}-${pageId}-`, '')}`)

            const sectionPath = `${metadataPath}/${page.id}/${section.id}`;
            await fs.mkdir(sectionPath);

            await fs.writeFile(`${sectionPath}/index.json`, JSON.stringify(lodash.omit(section, 'fields'), null, 2), {
                encoding: 'utf-8',
            });

            await fs.mkdir(`${sectionPath}/fields`);

            for (const field of section.fields) {
                await fs.writeFile(`${sectionPath}/fields/${field.field}.json`, JSON.stringify(field, null, 2), {
                    encoding: 'utf-8',
                });
            }
        }
    }

    await client.destroy();
}

async function runImport(theme) {
    const themePath = path.resolve(__dirname, `../themes/${theme}`);
    const metadataPath = `${themePath}/metadata`;
    const packageJson = JSON.parse(
        await fs.readFile(`${themePath}/package.json`, {
            encoding: 'utf-8',
        })
    );

    const client = knex({
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        }
    });
    const institutes = await client.from('institute');

    institutes.push({
        db_name: process.env.DB_TEMPLATE
    });

    async function importDB(insClient) {
        logger.info(`Creating theme: ${theme}`);

        await insClient
            .from('theme')
            .insert({
                id: packageJson.name,
                name: packageJson.description,
                version: packageJson.version,
            })
            .onConflict('id')
            .merge();

        const pageIds = await fs.readdir(metadataPath);

        for (const pageId of pageIds) {
            logger.info(`Importing page: ${pageId}`);

            const pagePath = `${metadataPath}/${pageId}`;
            const page = JSON.parse(
                await fs.readFile(`${pagePath}/index.json`, {encoding: 'utf-8'})
            );

            await insClient
                .table('theme_page')
                .insert(page)
                .onConflict('id')
                .merge();

            const sectionIds = await fs.readdir(pagePath);

            for (const sectionId of sectionIds) {
                if (sectionId === 'index.json') {
                    continue;
                }

                logger.info(`Importing section: ${sectionId}`);

                const sectionPath = `${metadataPath}/${pageId}/${sectionId}`;

                const section = JSON.parse(
                    await fs.readFile(`${sectionPath}/index.json`, {encoding: 'utf-8'})
                );

                section.fields = [];

                const fieldIds = await fs.readdir(`${sectionPath}/fields`);

                for (const fieldFile of fieldIds) {
                    const field = JSON.parse(
                        await fs.readFile(`${sectionPath}/fields/${fieldFile}`, {encoding: 'utf-8'})
                    );

                    section.fields.push(field);
                }

                section.fields = JSON.stringify(section.fields);


                await insClient
                    .table('theme_page_section')
                    .insert(section)
                    .onConflict('id')
                    .merge();
            }
        }
    }

    for (const institute of institutes) {
        const insClient = knex({
            client: process.env.DB_CLIENT,
            connection: {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: institute.db_name,
            }
        });

        await importDB(insClient);
        await insClient.destroy();
    }

    await importDB(client);

    await client.destroy();
}

export async function lint() {
    const themes = fs.readdirSync(path.resolve(__dirname, '../themes'));

    for (const theme of themes) {
        const esLintPath = path.resolve(__dirname, `../themes/${theme}/node_modules/.bin/eslint`);

        if (!fs.existsSync(esLintPath)) {
            continue;
        }

        try {
            execa.sync(path.resolve(__dirname, `../themes/${theme}/node_modules/.bin/eslint`), ['./', '--fix'], {
                stdio: 'inherit',
                shell: true,
                cwd: path.resolve(__dirname, `../themes/${theme}`),
            });
        } catch (e) {
            //
        }
    }
}

export async function _export(theme) {
    if (!theme || theme === 'all') {
        const themes = await fs.readdir(path.resolve(__dirname, '../themes'));

        for (const theme of themes) {
            await runExport(theme);
        }
    } else {
        await runExport(theme);
    }
}

export async function _import(theme) {
    if (!theme || theme === 'all') {
        const themes = await fs.readdir(path.resolve(__dirname, '../themes'));

        for (const theme of themes) {
            await runImport(theme);
        }
    } else {
        await runImport(theme);
    }
}

export async function migrate(dir) {
    logger.warn('Migrate command is not implemented')
}
