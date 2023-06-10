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
} = require('../../../constants');
const {
  resolvePath,
  blue,
  resolveInputPath,
  check,
  prettyJSON,
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

async function generateConfig(args, configType, configFile) {
  const hasBabel = await check(configType);
  if (!hasBabel) {
    const conf = await getConfig(configType, args);
    await fs.writeFile(
      resolvePath(configFile),
      prettyJSON(conf),
      DEFAULT_ENCODING
    );
    blue(getMessage(configType));
  }
}

module.exports = async function init(args) {
  const template = path.join(SCRIPT_ROOT, 'templates', CONFIG_FILE);
  const configFile = resolvePath(CONFIG_FILE);
  if (!existsSync(configFile)) {
    const configFileContent = await fs.readFile(template, DEFAULT_ENCODING);
    await fs.writeFile(
      configFile,
      configFileContent.replace(VAR_FILE_PATH, resolveInputPath(args).src),
      DEFAULT_ENCODING
    );
    blue(MSG_CONFIG(CONFIG_FILE));
  }
  await generateConfig(args, configTypes.BABEL, configFiles.BABEL);
  await generateConfig(args, configTypes.ESLINT, configFiles.ESLINT);
};
