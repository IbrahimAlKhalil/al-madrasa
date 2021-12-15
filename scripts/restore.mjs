import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import execa from 'execa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function run(db, filename) {
    execa.sync('/usr/bin/pg_restore', [
        path.resolve(__dirname, `../database/${filename}`),
        `--username=${process.env.DB_USER}`,
        `--host=${process.env.DB_HOST}`,
        `--port=${process.env.DB_PORT}`,
        '--no-password',
        `--dbname=${db}`,
    ], {
        shell: true,
        stdio: 'inherit',
        env: {
            PGPASSWORD: process.env.DB_PASSWORD
        }
    });
}

export async function restore(database) {
    switch (database) {
        case 'master':
            await run(process.env.DB_DATABASE, 'master.tar');
            break;
        case 'template':
            await run(process.env.DB_TEMPLATE, 'template.tar');
            break;
        default:
            await run(process.env.DB_DATABASE, 'master.tar');
            await run(process.env.DB_TEMPLATE, 'template.tar');
    }
}
