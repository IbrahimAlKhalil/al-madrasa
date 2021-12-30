import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import {promises as fs} from 'fs';
import {pack} from './pack.mjs';
import execa from 'execa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildApi() {
    await fs.rm(path.resolve(__dirname, '../api/dist'), {
        force: true,
        recursive: true,
    });

    execa.sync('pnpm', ['build'], {
        stderr: 'inherit',
        cwd: path.resolve(__dirname, '../api'),
        shell: true,
    });
}

async function buildDashboard() {
    await fs.rm(path.resolve(__dirname, '../app/dist'), {
        force: true,
        recursive: true,
    });

    execa.sync('pnpm', ['build'], {
        stdio: 'inherit',
        cwd: path.resolve(__dirname, '../app'),
        shell: true,
    });
}

async function buildThemes() {
    const themes = await fs.readdir(path.resolve(__dirname, '../themes'));

    for (const theme of themes) {
        await fs.rm(path.resolve(__dirname, `../themes/${theme}/.next`), {
            force: true,
            recursive: true,
        });

        execa.sync('pnpm', ['build'], {
            stdio: 'inherit',
            shell: true,
            cwd: path.resolve(__dirname, `../themes/${theme}`),
        });
    }
}

async function buildShared() {
    await fs.rm(path.resolve(__dirname, '../shared/dist'), {
        force: true,
        recursive: true,
    });

    execa.sync(path.resolve(__dirname, '../shared/node_modules/.bin/tsc'), [], {
        cwd: path.resolve(__dirname, '../shared'),
        shell: true,
        stdio: 'inherit',
    });
}

export async function build(api, dashboard, themes, shared, _pack) {
    if (api) {
        await buildApi();
    }

    if (dashboard) {
       await buildDashboard();
    }

    if (shared) {
       await buildShared();
    }

    if (themes) {
        await buildThemes();
    }

    if (_pack) {
        await pack();
    }

    if (!api && !dashboard && !themes && !shared && !_pack) {
        await buildApi();
        await buildDashboard();
        await buildShared();
        await buildThemes();
        await pack();
    }
}
