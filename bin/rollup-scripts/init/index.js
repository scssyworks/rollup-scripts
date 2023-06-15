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
  blue,
  check,
  prettyJSON,
  resolveInput,
  updateArgs,
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
  const { src, typescript, react } = resolveInput(args);
  const finalArgs = updateArgs(args, { typescript, react });
  blue(MSG_INIT);
  const template = path.join(SCRIPT_ROOT, 'templates', CONFIG_FILE);
  const configFile = resolvePath(CONFIG_FILE);
  if (!existsSync(configFile)) {
    const configFileContent = await fs.readFile(template, DEFAULT_ENCODING);
    await fs.writeFile(
      configFile,
      configFileContent.replace(VAR_FILE_PATH, src),
      DEFAULT_ENCODING
    );
    blue(MSG_CONFIG(CONFIG_FILE));
  }
  await generateConfig(finalArgs, configTypes.BABEL, configFiles.BABEL);
  await generateConfig(finalArgs, configTypes.ESLINT, configFiles.ESLINT);
};
