import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import {promises as fs} from 'fs';
import {pack} from './pack.mjs';
import execa from 'execa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function buildApi() {
    execa.sync('pnpm', ['build'], {
        stdio: 'inherit',
        cwd: path.resolve(__dirname, '../api'),
        shell: true,
    });
}

function buildDashboard() {
    execa.sync('pnpm', ['build'], {
        stdio: 'inherit',
        cwd: path.resolve(__dirname, '../app'),
        shell: true,
    });
}

async function buildThemes() {
    const themes = await fs.readdir(path.resolve(__dirname, '../themes'));

    for (const theme of themes) {
        execa.sync('pnpm', ['build'], {
            stdio: 'inherit',
            shell: true,
            cwd: path.resolve(__dirname, `../themes/${theme}`),
        });
    }
}

export async function build(api, dashboard, themes, _pack) {
    if (api) {
        buildApi();
    }

    if (dashboard) {
        buildDashboard();
    }

    if (themes) {
        await buildThemes();
    }

    if (_pack) {
        await pack();
    }

    if (!api && !dashboard && !themes && !_pack) {
        buildApi();
        buildDashboard();
        await buildThemes();
        await pack();
    }
}
