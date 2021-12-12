import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import execa from 'execa';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function lint() {
    const themes = fs.readdirSync(path.resolve(__dirname, '../themes'));

    for (const theme of themes) {
        const esLintPath = path.resolve(__dirname, `../themes/${theme}/node_modules/.bin/eslint`);

        if (!fs.existsSync(esLintPath)) {
            continue;
        }

        try {
            execa.sync(path.resolve(__dirname, `../themes/${theme}/node_modules/.bin/eslint`), ['./', '--fix'], {
                stdio: 'inherit',
                shell: true,
                cwd: path.resolve(__dirname, `../themes/${theme}`),
            });
        } catch (e) {
            //
        }
    }
}
