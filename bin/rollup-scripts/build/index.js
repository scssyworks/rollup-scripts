const { rollup } = require('rollup');
const getConfig = require('../../config');
const { blue, green, red } = require('../../../utils');

async function generateOutput(bundle, outputConfig) {
    const outConf = Array.isArray(outputConfig) ? outputConfig : [outputConfig];
    for (const conf of outConf) {
        const { output } = await bundle.write(conf);
        for (const chunkOrAsset of output) {
            console.log(green(`[${chunkOrAsset.type}] ${chunkOrAsset.fileName}`));
        }
    }
}

module.exports = async function build() {
    const bundles = [];
    let buildFailed = false;
    console.log(blue('Compiling...'));
    console.time(blue('Compiled in'));
    try {
        const rollupConfig = await getConfig();
        const configs = Array.isArray(rollupConfig) ? rollupConfig : [rollupConfig];
        for (const conf of configs) {
            const bundle = await rollup(conf);
            bundles.push(bundle);
            console.log(blue('Emitted:'));
            await generateOutput(bundle, conf.output);
        }
    } catch (error) {
        buildFailed = true;
        console.error(red(error));
    }
    if (bundles.length) {
        for (const bundle of bundles) {
            bundle.close();
        }
    }
    console.timeEnd(blue('Compiled in'));
    process.exit(buildFailed ? 1 : 0);
}