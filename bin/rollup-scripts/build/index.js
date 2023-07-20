const { rollup } = require('rollup');
const getConfig = require('../../config');
const { wrapArray, getLogger } = require('../../../utils');
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
  const logger = getLogger(args);
  logger.log(MSG_COMPILE);
  logger.timeStart(MSG_COMPILED);
  try {
    const rollupConfig = await getConfig(args, logger);
    const configs = wrapArray(rollupConfig);
    for (const conf of configs) {
      const bundle = await rollup(conf);
      bundles.push(bundle);
      logger.log(MSG_EMITTED);
      await generateOutput(bundle, conf.output);
    }
  } catch (error) {
    buildFailed = true;
    logger.error(error);
    logger.verbose(error);
  }
  if (bundles.length) {
    for (const bundle of bundles) {
      bundle.close();
    }
  }
  logger.timeEnd(MSG_COMPILED);
  process.exit(buildFailed ? 1 : 0);
};
