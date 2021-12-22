#!/usr/bin/env node

import {_export as exportThemeMeta, _import as importThemeMeta, migrate as themeMigrate} from './scripts/theme.mjs';
import {_export, _import} from './scripts/metadata.mjs';
import {prepare} from './scripts/prepare.mjs';
import {migrate} from './scripts/migrate.mjs';
import {restore} from './scripts/restore.mjs';
import {Command, program} from 'commander';
import {build} from './scripts/build.mjs';
import {start} from './scripts/start.mjs';
import {clean} from './scripts/clean.mjs';
import {lint} from './scripts/theme.mjs';
import {dump} from './scripts/dump.mjs';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, './package.json'), {encoding: 'utf-8'}));

program
    .version(packageJson.version)
    .name('am');

program.addCommand(
    new Command('dev')
        .option('-p, --postgres', 'Start postgres database')
        .option('-a, --app', 'Start application')
        .option('-s, --shared', 'Compile shared module in watch mode')
        .action((_, p) => start(
            p.getOptionValue('postgres'),
            p.getOptionValue('app'),
            p.getOptionValue('shared'),
        ))
    ,
    {
        isDefault: true,
    }
);

program.addCommand(
    new Command('prepare')
        .action(prepare)
);

program.addCommand(
    new Command('build')
        .option('-a, --api', 'Build api')
        .option('-d, --dashboard', 'Build dashboard')
        .option('-t, --themes', 'Build themes')
        .option('-s, --shared', 'Build the shared module')
        .option('-p, --pack', 'Package application')
        .action((_, p) => build(
            p.getOptionValue('api'),
            p.getOptionValue('dashboard'),
            p.getOptionValue('themes'),
            p.getOptionValue('shared'),
            p.getOptionValue('pack'),
        ))
);


// ----------------- Database ---------------------

const db = new Command('database');

db.addCommand(
    new Command('export')
        .option('-d, --database <db>', 'Specify the database to be dumped', 'all')
        .action((_, p) => dump(p.getOptionValue('database')))
);

db.addCommand(
    new Command('import')
        .option('-d, --database <db>', 'Specify the database to import', 'all')
        .action((_, p) => restore(p.getOptionValue('database')))
);

db.addCommand(
    new Command('clean')
        .option('-d, --database <db>', 'Specify the database to clean', 'all')
        .action((_, p) => clean(p.getOptionValue('database')))
);

const migrateCommand = new Command('migrate');

['up', 'down', 'latest'].forEach(dir => {
    migrateCommand.addCommand(
        new Command(dir)
            .option('-m, --master', 'Run only for master database')
            .option('-c, --children', 'Run only for children databases')
            .action((_, p) => migrate(dir, p.getOptionValue('master'), p.getOptionValue('children')))
    );
});

db.addCommand(migrateCommand);

program.addCommand(db);

// ----------------------- Metadata -----------------------

const metadata = new Command('metadata');

metadata.addCommand(
    new Command('export')
        .option('-d, --database <db>', 'Specify the database to export metadata from', 'all')
        .action((_, p) => _export(p.getOptionValue('database')))
);

metadata.addCommand(
    new Command('import')
        .option('-d, --database <db>', 'Specify the database to import metadata to', 'all')
        .action((_, p) => _import(p.getOptionValue('database')))
);

program.addCommand(metadata);


// ---------------- Theme ------------------

const theme = new Command('theme');

if (process.env.NODE_ENV === 'development') {
    theme.addCommand(
        new Command('lint')
            .action(lint)
    );
}

theme.addCommand(
    new Command('export')
        .option('-t, --theme', 'The theme, which metadata will be exported from', 'all')
        .action((_, p) => exportThemeMeta(p.getOptionValue('theme')))
);

theme.addCommand(
    new Command('import')
        .option('-t, --theme', 'The theme, which metadata will be imported to', 'all')
        .action((_, p) => importThemeMeta(p.getOptionValue('theme')))
);

const themeMigrateCmd = new Command('migrate');

['up', 'down'].forEach(dir => {
    themeMigrateCmd.addCommand(
        new Command(dir)
            .action(() => themeMigrate(dir))
    );
});

theme.addCommand(themeMigrateCmd);


program.addCommand(theme);

// ---------------------------------------

program.parse(process.argv);

