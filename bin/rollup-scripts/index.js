const { rollup } = require('rollup');
const chalk = require('chalk');
const getConfig = require('../config');

async function generateOutput(bundle, outputConfig) {
    const outConf = Array.isArray(outputConfig) ? outputConfig : [outputConfig];
    for (const conf of outConf) {
        const { output } = await bundle.write(conf);
        for (const chunkOrAsset of output) {
            console.log(chalk.bold(chalk.blue(`[${chunkOrAsset.type}] ${chunkOrAsset.fileName}`)));
        }
    }
}

module.exports = async function build() {
    const bundles = [];
    let buildFailed = false;
    console.log(chalk.bold(chalk.blue('Compiling...')));
    console.time(chalk.bold(chalk.blue('Compiled in')));
    try {
        const rollupConfig = await getConfig();
        const configs = Array.isArray(rollupConfig) ? rollupConfig : [rollupConfig];
        for (const conf of configs) {
            const bundle = await rollup(conf);
            bundles.push(bundle);
            console.log(chalk.bold(chalk.blue('Emitted:')));
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
    console.timeEnd(chalk.bold(chalk.blue('Compiled in')));
    process.exit(buildFailed ? 1 : 0);
}