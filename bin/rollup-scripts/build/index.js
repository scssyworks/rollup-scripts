const { rollup, watch: rollupWatch } = require('rollup');
const { getLogger } = require('rollup-scripts-utils');
const getConfig = require('../../config');
const { wrapArray } = require('../../../utils');
const {
  MSG_COMPILE,
  MSG_COMPILED,
  MSG_EMITTED,
  MSG_WATCH_START,
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

function initWatch(watchConfig, args, index) {
  const logger = getLogger(args);
  const watcher = rollupWatch(watchConfig);
  watcher.on('event', (event) => {
    if (event.code === 'START') {
      logger.log(MSG_COMPILE);
      logger.timeStart(MSG_COMPILED);
    }
    if (event.code === 'END') {
      logger.timeEnd(MSG_COMPILED);
    }
    if (event.result) {
      event.result.close();
    }
  });
  return watcher;
}

module.exports = async function build(args) {
  const logger = getLogger(args);
  const { watch } = args;
  logger.log(watch ? MSG_WATCH_START : MSG_COMPILE);
  !watch && logger.timeStart(MSG_COMPILED);
  const rollupConfig = await getConfig(args, logger);
  const configs = wrapArray(rollupConfig);
  if (watch) {
    // Testing with single build
    let index = 0;
    for (const watchOptions of configs) {
      initWatch(watchOptions, args, index++);
    }
  } else {
    logger.log(MSG_EMITTED);
    const success = await rollupBuild(configs);
    logger.timeEnd(MSG_COMPILED);
    process.exit(success ? 0 : 1);
  }
};
