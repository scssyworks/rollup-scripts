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

async function singleBuild(conf) {
  const bundle = await rollup(conf);
  await generateOutput(bundle, conf.output);
  bundle.close();
}

async function rollupBuild(configArray, args) {
  const logger = getLogger(args);
  try {
    await Promise.all(configArray.map((conf) => singleBuild(conf)));
    return true;
  } catch (e) {
    logger.verbose(e);
    return false;
  }
}

module.exports = async function build(args) {
  const logger = getLogger(args);
  const { watch } = args;
  logger.log(MSG_COMPILE);
  logger.timeStart(MSG_COMPILED);
  const rollupConfig = await getConfig(args, logger);
  const configs = wrapArray(rollupConfig);
  if (watch) {
    logger.muted(
      'Dev script is in active development and will be available in next version.'
    );
  } else {
    logger.log(MSG_EMITTED);
    const success = await rollupBuild(configs);
    logger.timeEnd(MSG_COMPILED);
    process.exit(success ? 0 : 1);
  }
};
