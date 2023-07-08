const { existsSync } = require('node:fs');
const fs = require('node:fs/promises');
const path = require('node:path');
const babelConfig = require('../../../templates/babel.config');
const eslintConfig = require('../../../templates/eslint.config');
const {
  SCRIPT_ROOT,
  CONFIG_FILE,
  MSG_CONFIG,
  MSG_CONFIGBABEL,
  DEFAULT_ENCODING,
  VAR_FILE_PATH,
  configTypes,
  configFiles,
  MSG_CONFIGESLINT,
  MSG_INIT,
} = require('../../../constants');
const {
  resolvePath,
  check,
  prettyJSON,
  getInputProps,
  updateArgs,
  getLogger,
} = require('../../../utils');

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
  }
}

async function generateConfig(args, configType, configFile, lgr) {
  const logger = getLogger(args, lgr);
  const hasBabel = await check(configType);
  if (!hasBabel) {
    const conf = await getConfig(configType, args);
    await fs.writeFile(
      resolvePath(configFile),
      prettyJSON(conf),
      DEFAULT_ENCODING
    );
    logger.success(getMessage(configType));
  }
}

module.exports = async function init(args) {
  const logger = getLogger(args);
  const { src, typescript, react, preact } = getInputProps(args, logger);
  const finalArgs = updateArgs(args, { typescript, react, preact });
  logger.log(MSG_INIT);
  const template = path.join(SCRIPT_ROOT, 'templates', CONFIG_FILE);
  const configFile = resolvePath(CONFIG_FILE);
  if (!existsSync(configFile)) {
    const configFileContent = await fs.readFile(template, DEFAULT_ENCODING);
    await fs.writeFile(
      configFile,
      configFileContent.replace(VAR_FILE_PATH, src),
      DEFAULT_ENCODING
    );
    logger.success(MSG_CONFIG(CONFIG_FILE));
  }
  await generateConfig(finalArgs, configTypes.BABEL, configFiles.BABEL, logger);
  await generateConfig(
    finalArgs,
    configTypes.ESLINT,
    configFiles.ESLINT,
    logger
  );
};
