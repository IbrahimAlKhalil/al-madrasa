import path, {dirname} from "path";
import {fileURLToPath} from "url";
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

function buildImage() {
    execa.sync('docker', ['build', '.', '-t', 'registry.saharait.com/al-madrasah-cms'], {
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
