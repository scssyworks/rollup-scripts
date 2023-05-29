const { rollup } = require('rollup');
const chalk = require('chalk');
const getConfig = require('../config');

async function generateOutput(bundle, outputConfig) {
    const outConf = Array.isArray(outputConfig) ? outputConfig : [outputConfig];
    for (const conf of outConf) {
        const { output } = await bundle.write(conf);
        for (const chunkOrAsset of output) {
            console.log(chunkOrAsset);
        }
    }
}

module.exports = async function build() {
    const bundles = [];
    let buildFailed = false;
    try {
        const rollupConfig = await getConfig();
        const configs = Array.isArray(rollupConfig) ? rollupConfig : [rollupConfig];
        console.log(chalk.bold(chalk.blue('Compiling...')));
        for (const conf of configs) {
            const bundle = await rollup(conf);
            bundles.push(bundle);
            await generateOutput(bundle, conf.output);
        }
    } catch (error) {
        buildFailed = true;
        console.error(error);
    }
    if (bundles.length) {
        for (const bundle of bundles) {
            bundle.close();
        }
    }
    process.exit(buildFailed ? 1 : 0);
}