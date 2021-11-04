const childProcess = require('child_process');
const path = require("path");

require('dotenv').config();

childProcess.spawnSync('pg_dump', [
    `--username=${process.env.DB_USER}`,
    `--host=${process.env.DB_HOST}`,
    `--port=${process.env.DB_PORT}`,
    `--dbname=${process.env.DB_DATABASE}`,
    '--format=plain',
    '--no-owner',
    '--no-privileges',
    '--no-acl',
    '--inserts',
    '--quote-all-identifiers',
    '--no-password',
    `--file=${path.resolve(__dirname, '../database/dump.sql')}`
], {
    env: {
        PGPASSWORD: process.env.DB_PASSWORD,
    },
    shell: true,
    stdio: 'inherit'
})
