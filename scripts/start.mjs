#!/usr/bin/env node

import cliProgress from 'cli-progress';
import {prepare} from './prepare.mjs';
import {logger} from './logger.mjs';
import {fileURLToPath} from 'url';
import Docker from 'dockerode';
import {dirname} from 'path';
import execa from 'execa';
import path from 'path';
import pg from 'pg';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const docker = new Docker(
    process.platform === 'win32'
        ? 'tcp://127.0.0.1:2375'
        : '/var/run/docker.sock',
);
const prefix = 'al-madrasah';
const images = {
    postgres: 'postgis/postgis:14-3.1-alpine',
};
const containerNames = {
    postgres: `${prefix}-postgres`,
};

async function removeContainer(name) {
    logger.info(`Stopping container ${name}`);

    try {
        const postgres = docker.getContainer(name);
        await postgres.stop();
    } catch (e) {
        //
    }

    logger.info(`Removing container ${name}`);
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
        logger.info(`Pulling ${tag}`);

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

async function startApp() {
    logger.info('Starting application');

    if (!fs.existsSync(path.resolve(__dirname, '../uploads'))) {
        fs.mkdirSync(path.resolve(__dirname, '../uploads'));
    }

    const tsNode = path.resolve(__dirname, '../api/node_modules/.bin/ts-node-dev');
    const themesDir = path.resolve(__dirname, '../themes');
    const appDir = path.resolve(__dirname, '../app');

    execa(tsNode, ['--files', '--transpile-only', '--respawn', '--watch', '.env', '--ignore-watch', themesDir, '--ignore-watch', appDir, '--inspect', '--exit-child', '--', './src/start.ts'], {
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

async function startPostgres() {
    logger.info(`Creating volume ${containerNames.postgres}`);

    try {
        await docker.createVolume({
            Name: containerNames.postgres,
        });
    } catch (e) {
        logger.info(`Volume ${containerNames.postgres} already exists`);
    }

    logger.info(`Creating container ${containerNames.postgres}`);

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

    logger.info(`Starting container ${containerNames.postgres}`);

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

    await client.end();

    await prepare();
}

async function startShared() {
    execa(path.resolve(__dirname, '../shared/node_modules/.bin/tsc'), ['-w'], {
        shell: true,
        stdio: 'inherit',
        cwd: path.resolve(__dirname, '../shared')
    });
}

async function stop() {
    logger.info('Stopping...');

    await removeContainer(containerNames.postgres);

    logger.info('Stopped');
}

async function close() {
    // Stop all the services
    await stop();

    // Finally exit
    process.exit();
}

export async function start(postgres, app, shared) {
    process.stdin.resume();
    process.on('exit', close);
    process.on('SIGINT', close);
    process.on('SIGUSR1', close);
    process.on('SIGUSR2', close);
    process.on('uncaughtException', close);

    await pullImages();
    await stop();

    logger.info('Starting...');
    logger.info(`Creating network ${prefix}`);

    if (postgres) {
        await startPostgres();
    }

    if (shared) {
        await startShared();
    }

    if (app) {
        await startApp();
    }

    if (!postgres && !app && !shared) {
        await startPostgres();
        await startApp();
        await startShared();
    }

    logger.info('Started');
}
