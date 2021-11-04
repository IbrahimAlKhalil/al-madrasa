const childProcess = require('child_process');
const path = require("path");

require('dotenv').config()

childProcess.spawnSync('psql', [
    `--username=${process.env.DB_USER}`,
    `--host=${process.env.DB_HOST}`,
    `--port=${process.env.DB_PORT}`,
    `--dbname=${process.env.DB_DATABASE}`,
    `--file=${path.resolve(__dirname, '../database/dump.sql')}`,
    '--no-password',
], {
    shell: true,
    stdio: 'inherit',
    env: {
        PGPASSWORD: process.env.DB_PASSWORD
    }
})
