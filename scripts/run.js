#!/usr/bin/env node

const childProcess = require('child_process');
const cliProgress = require('cli-progress');
const Docker = require('dockerode');
const dotenv = require('dotenv');
const path = require('path');
const pg = require('pg');

// Load environment variables
dotenv.config();
const env = process.env;

const docker = new Docker(
    process.platform === 'win32'
        ? 'tcp://127.0.0.1:2375'
        : '/var/run/docker.sock',
);
const prefix = env.CODE;
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

    childProcess.spawn('pnpm', ['dev'], {
        env,
        shell: true,
        stdio: 'inherit',
        cwd: path.resolve(__dirname, '../api')
    });
}

async function startApp() {
    logTask('Starting', 'CMS App');

    childProcess.spawn(path.resolve(__dirname, '../app/node_modules/.bin/vite'), ['--port', env.APP_PORT, '--host', '0.0.0.0'], {
        env,
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
        Env: [`POSTGRES_PASSWORD=${env.DB_PASSWORD}`],
        Hostname: containerNames.postgres,
        HostConfig: {
            PortBindings: {
                '5432/tcp': [
                    {
                        HostIp: '127.0.0.1',
                        HostPort: `${env.DB_PORT}/tcp`,
                    },
                ],
                '5432/udp': [
                    {
                        HostIp: '127.0.0.1',
                        HostPort: `${env.DB_PORT}/udp`,
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
                host: env.DB_HOST,
                port: Number(env.DB_PORT),
                database: env.DB_DATABASE,
                user: env.DB_USER,
                password: env.DB_PASSWORD,
                connect_timeout: 30000
            });

            await _client.connect();
            client = _client;
        } catch (e) {
            //
        }
    }, () => !!client);

    const directusPath = path.resolve(__dirname, '../node_modules/.bin/directus');

    childProcess.spawnSync(directusPath, ['database', 'install'], {
        shell: true,
    });
    childProcess.spawnSync(directusPath, ['database', 'migrate:up'], {
        shell: true,
    });
}

async function stop() {
    console.log('\x1b[41mStopping...\x1b[0m');

    await removeContainer(containerNames.postgres);

    console.log('\x1b[41mStopped\x1b[0m \x1b[32m✔\x1b[0m');
}

async function start() {
    console.log('\x1b[42mStarting...\x1b[0m');
    logTask('Creating network', prefix);

    await startPostgres();
    startApi();
    startApp();

    console.log('\x1b[42mStarted\x1b[0m \x1b[32m✔\x1b[0m');
}

async function close() {
    // Stop all the services
    await stop();

    // Finally exit
    process.exit();
}

pullImages().then(stop).then(start).catch(console.error);

process.stdin.resume();

process.on('exit', close);
process.on('SIGINT', close);
process.on('SIGUSR1', close);
process.on('SIGUSR2', close);
process.on('uncaughtException', close);
