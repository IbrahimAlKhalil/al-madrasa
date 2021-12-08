import path, {dirname} from 'path';
import {promises as fs} from 'fs';
import {fileURLToPath} from 'url';
import AdmZip from 'adm-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function zipAdd(zip, paths, srcPath, zipPath) {
    for (const _path of paths) {
        const absPath = path.resolve(__dirname, srcPath, _path);
        const stat = await fs.lstat(absPath);

        if (stat.isDirectory()) {
            zip.addLocalFolder(absPath, zipPath ? `${zipPath}/${_path}` : _path);
        } else {
            zip.addLocalFile(absPath, zipPath);
        }
    }
}

export async function pack() {
    const zip = new AdmZip();

    await zipAdd(zip, ['uploads', 'database', 'scripts', 'am.mjs', 'package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml'], '../');
    await zipAdd(zip, ['dist', 'package.json', 'index.js', 'start.js', 'cli.js'], '../api', '/api');
    await zipAdd(zip, ['dist'], '../app', '/app');

    const themes = await fs.readdir(path.resolve(__dirname, '../themes'));

    for (const theme of themes) {
        await zipAdd(zip, ['.next', 'package.json', 'next.config.js'], `../themes/${theme}`, `/themes/${theme}`);
    }

    zip.writeZip(path.resolve(__dirname, '../dist/package.zip'), () => {
        console.log('package.zip is saved under /dist');
    });
}
