const { rollup } = require('rollup');
const getConfig = require('../../config');
const { blue, red, timeStart, timeEnd } = require('../../../utils');

async function generateOutput(bundle, outputConfig) {
  const outConf = Array.isArray(outputConfig) ? outputConfig : [outputConfig];
  for (const conf of outConf) {
    await bundle.write(conf);
  }
}

module.exports = async function build(args) {
  const bundles = [];
  let buildFailed = false;
  const { verbose } = args;
  blue('Compiling...');
  timeStart('Compiled in');
  try {
    const rollupConfig = await getConfig(args);
    const configs = Array.isArray(rollupConfig) ? rollupConfig : [rollupConfig];
    for (const conf of configs) {
      const bundle = await rollup(conf);
      bundles.push(bundle);
      blue('Emitted:');
      await generateOutput(bundle, conf.output);
    }
  } catch (error) {
    buildFailed = true;
    red(error);
    if (verbose) {
      console.error(error);
    }
  }
  if (bundles.length) {
    for (const bundle of bundles) {
      bundle.close();
    }
  }
  timeEnd('Compiled in');
  process.exit(buildFailed ? 1 : 0);
};
