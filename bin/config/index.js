const { defineConfig } = require('rollup');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const babelConfig = require('./babelConfig');
const { configFile, fromPackage, getName, resolvePath } = require('../../utils');

const commonOutputConfig = {
    name: getName(),
    exports: 'named'
};

// Read configuration from current workspace. Default config file: rs.config.js
const defaultConfig = defineConfig({
    input: resolvePath('src/index.mjs'),
    output: [
        {
            ...commonOutputConfig,
            file: resolvePath(fromPackage('module') ?? 'dist/esm/output.mjs'),
            format: 'es'
        },
        {
            ...commonOutputConfig,
            file: resolvePath(fromPackage('main') ?? 'dist/umd/output.js'),
            format: 'umd'
        }
    ],
    plugins: [
        json(),
        nodeResolve(),
        commonjs({
            include: 'node_modules/**',
            extensions: ['.js', '.ts']
        }),
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.es6', '.es'],
            babelHelpers: 'runtime',
            ...babelConfig
        })
    ],
    external: Object.keys(fromPackage('dependencies') ?? {})
});

module.exports = async () => {
    let configFn;
    let finalConfig = defaultConfig;
    try {
        configFn = require(resolvePath(configFile));
    } catch (e) { }

    if (typeof configFn === 'function') {
        finalConfig = await Promise.resolve(configFn(defaultConfig));
    }
    return finalConfig;
}