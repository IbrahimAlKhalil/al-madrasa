#!/usr/bin/env node

import childProcess from "child_process";
import cliProgress from "cli-progress";
import {fileURLToPath} from 'url';
import Docker from "dockerode";
import {dirname} from 'path';
import path from "path";
import pg from "pg";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const docker = new Docker(
    process.platform === 'win32'
        ? 'tcp://127.0.0.1:2375'
        : '/var/run/docker.sock',
);
const prefix = 'madrasa3';
const images = {
    postgres: 'postgis/postgis:14-3.1-alpine',
};
const containerNames = {
    postgres: `${prefix}-postgres`,
};

function logTask(message, name) {
    console.log(`\x1b[34m ${message}:\x1b[0m \x1b[36m${name}\x1b[0m`);
}

async function removeContainer(name) {
    logTask('Stopping container', name);

    try {
        const postgres = docker.getContainer(name);
        await postgres.stop();
    } catch (e) {
        //
    }

    logTask('Removing container', name);
    try {
        const postgres = docker.getContainer(name);
        await postgres.remove();
    } catch (e) {
        //
    }
}

function waitUntilTrue(fn, callback) {
    return new Promise((resolve) => {
        const schedule = async () => {
            await fn();

            if (await callback()) {
                resolve();
            } else {
                process.nextTick(schedule);
            }
        };

        process.nextTick(schedule);
    });
}

function pullImage(tag) {
    return new Promise(async (resolve) => {
        console.log(`\x1b[32mPulling:\x1b[0m ${tag}`, '\n');

        const bar = new cliProgress.SingleBar(
            {},
            cliProgress.Presets.shades_classic,
        );

        bar.once('stop', resolve);
        bar.start();

        function onProgress(event) {
            const {progressDetail} = event;

            // Update progressbar
            if (progressDetail) {
                bar.setTotal(progressDetail.total);
                bar.update(progressDetail.current);
            }
        }

        function onFinish() {
            bar.stop();
        }

        await docker.pull(tag, (error, stream) => {
            docker.modem.followProgress(stream, onFinish, onProgress);
        });
    });
}

function pullImages() {
    return new Promise(async (resolve) => {
        const required = [];
        const availableImages = (await docker.listImages())
            .filter((image) => image.RepoTags)
            .map((image) => image.RepoTags[0]);

        for (const k in images) {
            required.push(images[k]);
        }

        // Pull images if not available
        for (const [index, value] of required.entries()) {
            if (availableImages.includes(value)) {
                if (index + 1 === required.length) {
                    resolve();
                }

                continue;
            }

            await pullImage(value);
        }
    });
}

async function startApi() {
    logTask('Starting', 'CMS API');

    if (!fs.existsSync(path.resolve(__dirname, '../uploads'))) {
        fs.mkdirSync(path.resolve(__dirname, '../uploads'));
    }

    const tsNode = path.resolve(__dirname, '../api/node_modules/.bin/ts-node-dev');

    childProcess.spawn(tsNode, ['--files', '--transpile-only', '--respawn', '--watch', '.env', '--inspect', '--exit-child', '--', './src/start.ts'], {
        env: {
            ...process.env,
            SERVE_APP: false,
            NODE_ENV: 'development',
        },
        shell: true,
        stdio: 'inherit',
        cwd: path.resolve(__dirname, '../api')
    });
}

async function startApp() {
    logTask('Starting', 'CMS App');

    const vite = path.resolve(__dirname, '../app/node_modules/.bin/vite')

    childProcess.spawn(vite, ['--port', process.env.APP_PORT, '--host', '0.0.0.0'], {
        env: process.env,
        shell: true,
        stdio: "inherit",
        cwd: path.resolve(__dirname, '../app')
    });
}

async function startPostgres() {
    logTask('Creating volume', containerNames.postgres);

    try {
        await docker.createVolume({
            Name: containerNames.postgres,
        });
    } catch (e) {
        console.log(`Volume ${containerNames.postgres} already exists`)
    }

    logTask('Creating container', containerNames.postgres);

    const postgres = await docker.createContainer({
        name: containerNames.postgres,
        Image: images.postgres,
        Env: [
            `POSTGRES_DB=${process.env.DB_DATABASE}`,
            `POSTGRES_USER=${process.env.DB_USER}`,
            `POSTGRES_PASSWORD=${process.env.DB_PASSWORD}`
        ],
        Hostname: containerNames.postgres,
        HostConfig: {
            PortBindings: {
                '5432/tcp': [
                    {
                        HostIp: '127.0.0.1',
                        HostPort: `${process.env.DB_PORT}/tcp`,
                    },
                ],
                '5432/udp': [
                    {
                        HostIp: '127.0.0.1',
                        HostPort: `${process.env.DB_PORT}/udp`,
                    },
                ],
            },
            RestartPolicy: {
                Name: 'on-failure',
            },
            Binds: [`${containerNames.postgres}:/var/lib/postgresql/data`],
        },
    });

    logTask('Starting container', containerNames.postgres);

    await postgres.start();

    let client = null;

    await waitUntilTrue(async () => {
        try {
            const _client = new pg.Client({
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                database: process.env.DB_DATABASE,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                connect_timeout: 30000
            });

            await _client.connect();
            client = _client;
        } catch (e) {
            //
        }
    }, () => !!client);

    const checkDirectusQuery = `
        select exists(
                       select *
                       from information_schema.tables
                       where table_schema = 'public'
                         and table_name = 'directus_collections'
                   )
    `;
    let exists = await client.query(checkDirectusQuery);

    if (!exists.rows[0].exists) {
        childProcess.spawnSync('node', [
            path.resolve(__dirname, '../am.js'),
            'restore',
            '-d',
            'master'
        ]);
    }

    exists = await client.query(`
        select exists(select datname
                      from pg_catalog.pg_database
                      where datname = $1)
    `, [process.env.DB_TEMPLATE]);

    if (!exists.rows[0].exists) {
        await client.query(`
           CREATE DATABASE "${process.env.DB_TEMPLATE}"
           WITH
           OWNER = "${process.env.DB_USER}"
           ENCODING = 'UTF8'
           CONNECTION LIMIT = -1;
        `)
    }

    await client.end();
    client = null;

    await waitUntilTrue(async () => {
        try {
            const _client = new pg.Client({
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                database: process.env.DB_TEMPLATE,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                connect_timeout: 30000
            });

            await _client.connect();
            client = _client;
        } catch (e) {
            //
        }
    }, () => !!client);
    exists = await client.query(checkDirectusQuery);

    if (!exists.rows[0].exists) {
        childProcess.spawnSync('node', [
            path.resolve(__dirname, '../am.js'),
            'restore',
            '-d',
            'template'
        ]);
    }
}

async function stop() {
    console.log('\x1b[41mStopping...\x1b[0m');

    await removeContainer(containerNames.postgres);

    console.log('\x1b[41mStopped\x1b[0m \x1b[32m✔\x1b[0m');
}

async function close() {
    // Stop all the services
    await stop();

    // Finally exit
    process.exit();
}

export async function start(postgres, api, app) {
    process.stdin.resume();
    process.on('exit', close);
    process.on('SIGINT', close);
    process.on('SIGUSR1', close);
    process.on('SIGUSR2', close);
    process.on('uncaughtException', close);

    await pullImages();
    await stop();

    console.log('\x1b[42mStarting...\x1b[0m');
    logTask('Creating network', prefix);

    if (postgres) {
        await startPostgres();
    }

    if (api) {
        await startApi();
    }

    if (app) {
        await startApp();
    }

    if (!postgres && !api && !app) {
        await startPostgres();
        await startApi();
        await startApp();
    }

    console.log('\x1b[42mStarted\x1b[0m \x1b[32m✔\x1b[0m');
}
