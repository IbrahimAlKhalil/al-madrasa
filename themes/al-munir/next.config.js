/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    eslint: {ignoreDuringBuilds: true},
    typescript: {
        tsconfigPath: './tsconfig.json',
    }
};
