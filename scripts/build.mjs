import childProcess from "child_process";
import path, {dirname} from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function buildApi() {
    childProcess.spawnSync('pnpm', ['build'], {
        stdio: 'inherit',
        cwd: path.resolve(__dirname, '../api'),
        shell: true,
    });
}

function buildDashboard() {
    childProcess.spawnSync('pnpm', ['build'], {
        stdio: 'inherit',
        cwd: path.resolve(__dirname, '../app'),
        shell: true,
    });
}

function buildImage() {
    childProcess.spawnSync('docker', ['build', '.', '-t', 'registry.saharait.com/al-madrasah-cms'], {
        stdio: 'inherit',
        shell: true,
        cwd: path.resolve(__dirname, '../')
    });
}

export function build(api, dashboard, image) {
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

    if (image) {
        buildImage();
    }

    if (!api && !api) {
        buildApi();
        buildDashboard();
        buildImage();
    }
}
