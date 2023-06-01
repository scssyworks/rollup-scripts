const { defineConfig } = require('rollup');
const { resolvePath } = require('rollup-scripts');

module.exports = function config(initialConfig) {
    return defineConfig({
        input: resolvePath('src/index.mjs'),
        ...initialConfig
    });
}