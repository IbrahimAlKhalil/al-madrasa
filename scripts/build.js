const childProcess = require('child_process');
const path = require('path');

childProcess.spawnSync('pnpm', ['build'], {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '../api'),
    shell: true,
});

childProcess.spawnSync('pnpm', ['build'], {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '../app'),
    shell: true,
});

childProcess.spawnSync('docker', ['build', '.', '-t', 'registry.saharait.com/al-madrasah-cms'], {
    stdio: 'inherit',
    shell: true,
    cwd: path.resolve(__dirname, '../')
});
