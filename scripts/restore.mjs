import childProcess from "child_process";
import path, {dirname} from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function run(db, filename) {
    childProcess.spawnSync('/usr/bin/psql', [
        `--username=${process.env.DB_USER}`,
        `--host=${process.env.DB_HOST}`,
        `--port=${process.env.DB_PORT}`,
        '--no-password',
        `--dbname=${db}`,
        `--file=${path.resolve(__dirname, `../database/${filename}.sql`)}`
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
            await run(process.env.DB_DATABASE, 'master');
            break;
        case 'template':
            await run(process.env.DB_TEMPLATE, 'template');
            break;
        default:
            await run(process.env.DB_DATABASE, 'master');
            await run(process.env.DB_TEMPLATE, 'template');
    }
}
