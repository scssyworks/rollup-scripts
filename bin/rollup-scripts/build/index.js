const { rollup } = require('rollup');
const getConfig = require('../../config');
const { blue, red, timeStart, timeEnd, wrapArray } = require('../../../utils');
const {
  MSG_COMPILE,
  MSG_COMPILED,
  MSG_EMITTED,
} = require('../../../constants');

async function generateOutput(bundle, outputConfig) {
  const outConf = wrapArray(outputConfig);
  for (const conf of outConf) {
    await bundle.write(conf);
  }
}

module.exports = async function build(args) {
  const bundles = [];
  let buildFailed = false;
  const { verbose } = args;
  blue(MSG_COMPILE);
  timeStart(MSG_COMPILED);
  try {
    const rollupConfig = await getConfig(args);
    const configs = wrapArray(rollupConfig);
    for (const conf of configs) {
      const bundle = await rollup(conf);
      bundles.push(bundle);
      blue(MSG_EMITTED);
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
  timeEnd(MSG_COMPILED);
  process.exit(buildFailed ? 1 : 0);
};
