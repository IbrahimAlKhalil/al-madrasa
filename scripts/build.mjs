import path, {dirname} from "path";
import {fileURLToPath} from "url";
import {promises as fs} from 'fs';
import execa from "execa";

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

function buildImage() {
    execa.sync('docker', ['build', '.', '-t', 'registry.saharait.com/al-madrasah-cms'], {
        stdio: 'inherit',
        shell: true,
        cwd: path.resolve(__dirname, '../')
    });
}

export async function build(api, dashboard, image, themes) {
    if (dashboard) {
        api = true;
        dashboard = true;
    }

    if (api) {
        buildApi();
    }

    if (dashboard) {
        buildDashboard();
    }

    if (themes) {
        await buildThemes();
    }

    if (image) {
        buildImage();
    }

    if (!api && !dashboard && !image && !themes) {
        buildApi();
        buildDashboard();
        await buildThemes();
        buildImage();
    }
}
