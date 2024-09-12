const fs = require('node:fs');
const fsPromises = require('node:fs/promises');
const path = require('node:path');
const rsConfig = require('../../../templates/rs.json');
const babelConfig = require('../../../templates/babel.config');
const eslintConfig = require('../../../templates/eslint.config');
const {
  MSG_CONFIG,
  MSG_CONFIGBABEL,
  DEFAULT_ENCODING,
  configTypes,
  configFiles,
  MSG_CONFIGESLINT,
  MSG_INIT,
  MSG_CONFIGSWC,
} = require('../../../constants');
const {
  check,
  prettyJSON,
  getInputProps,
  updateArgs,
} = require('../../../utils');
const { resolvePath, getLogger } = require('rollup-scripts-utils');

async function getConfig(configType, args) {
  switch (configType) {
    case configTypes.BABEL:
      return babelConfig(args);
    case configTypes.ESLINT:
      return await eslintConfig(args);
  }
}

function getMessage(configType) {
  switch (configType) {
    case configTypes.BABEL:
      return MSG_CONFIGBABEL;
    case configTypes.ESLINT:
      return MSG_CONFIGESLINT;
    case configTypes.SWC:
      return MSG_CONFIGSWC;
  }
}

async function generateConfig(args, configType, configFile) {
  const logger = getLogger(args);
  const hasConfig = check(configType);
  if (!hasConfig) {
    const conf = await getConfig(configType, args);
    await fsPromises.writeFile(
      resolvePath(configFile),
      prettyJSON(conf),
      DEFAULT_ENCODING,
    );
    logger.success(getMessage(configType));
  }
}

module.exports = async function init(args) {
  const { configFile } = args;
  const logger = getLogger(args);
  const { src, sourceTypes } = getInputProps(args, logger);
  const finalArgs = updateArgs(args, sourceTypes);
  logger.log(MSG_INIT);
  try {
    const targetFile = resolvePath(configFile);
    if (!fs.existsSync(targetFile)) {
      const template = JSON.parse(JSON.stringify(rsConfig));
      template.$schema =
        './node_modules/rollup-scripts/templates/schemas/rs.schema.json';
      template.input = path.relative(rsConfig.srcRoot, src);
      await fsPromises.writeFile(
        targetFile,
        prettyJSON(template),
        DEFAULT_ENCODING,
      );
      logger.success(MSG_CONFIG(configFile));
    }
    await generateConfig(finalArgs, configTypes.BABEL, configFiles.BABEL);
    await generateConfig(finalArgs, configTypes.ESLINT, configFiles.ESLINT);
  } catch (e) {
    logger.verbose(e);
  }
};
