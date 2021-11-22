const childProcess = require('child_process');
const path = require("path");

require('dotenv').config();

const flags = [
    `--username=${process.env.DB_USER}`,
    `--host=${process.env.DB_HOST}`,
    `--port=${process.env.DB_PORT}`,
    '--no-password',
];

const options = {
    shell: true,
    stdio: 'inherit',
    env: {
        PGPASSWORD: process.env.DB_PASSWORD
    }
};

childProcess.spawnSync('psql', [
    ...flags,
    `--dbname=${process.env.DB_DATABASE}`,
    `--file=${path.resolve(__dirname, '../database/master.sql')}`,
], options);

childProcess.spawnSync('psql', [
    ...flags,
    `--dbname=${process.env.DB_TEMPLATE}`,
    `--file=${path.resolve(__dirname, '../database/template.sql')}`,
], options);
