#!/usr/bin/env node

import {restore} from "./scripts/restore.mjs";
import {Command, program} from "commander";
import {build} from "./scripts/build.mjs";
import {start} from "./scripts/start.mjs";
import {clean} from "./scripts/clean.mjs";
import {prod} from "./scripts/prod.mjs";
import {dump} from "./scripts/dump.mjs";
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import dotenv from 'dotenv';
import path from "path";
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
        .option('-a, --api', 'Start api server')
        .option('-d, --dashboard', 'Start dashboard application')
        .action((_, p) => start(
            p.getOptionValue('postgres'),
            p.getOptionValue('api'),
            p.getOptionValue('dashboard')
        ))
    ,
    {
        isDefault: true,
    }
);

program.addCommand(
    new Command('prod')
        .action(prod)
);

program.addCommand(
    new Command('build')
        .option('-a, --api', 'Build api')
        .option('-d, --dashboard', 'Build dashboard')
        .option('-i, --image', 'Build docker image')
        .option('-t, --themes', 'Build themes')
        .action((_, p) => build(
            p.getOptionValue('api'),
            p.getOptionValue('dashboard'),
            p.getOptionValue('image'),
            p.getOptionValue('themes')
        ))
);


// ----------------- Command: db ---------------------

const db = new Command('db');

db.addCommand(
    new Command('dump')
        .option('-d, --database <db>', 'Dump databases', 'all')
        .action((_, p) => dump(p.getOptionValue('database')))
);

db.addCommand(
    new Command('restore')
        .option('-d, --database <db>', 'Restore databases from dump files', 'all')
        .action((_, p) => restore(p.getOptionValue('database')))
);

db.addCommand(
    new Command('clean')
        .option('-d, --database <db>', 'Restore databases from dump files', 'all')
        .action((_, p) => clean(p.getOptionValue('database')))
);

program.addCommand(db);

// -----------------------------------------

program.parse(process.argv);

