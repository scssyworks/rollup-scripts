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
} = require('../../../constants');
const {
  resolvePath,
  blue,
  resolveInputPath,
  check,
  prettyJSON,
} = require('../../../utils');

function getConfig(configType, args) {
  switch (configType) {
    case configTypes.BABEL:
      return babelConfig(args);
    case configTypes.ESLINT:
      return eslintConfig(args);
  }
}

async function generateConfig(args, configType, configFile) {
  const hasBabel = await check(configType);
  if (!hasBabel) {
    await fs.writeFile(
      resolvePath(configFile),
      prettyJSON(getConfig(configType, args)),
      DEFAULT_ENCODING
    );
    blue(MSG_CONFIGBABEL);
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
  await generateConfig(configTypes.BABEL, args);
  await generateConfig(configTypes.ESLINT, args);
};
