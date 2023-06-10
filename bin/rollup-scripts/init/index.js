const { existsSync } = require('node:fs');
const fs = require('node:fs/promises');
const path = require('node:path');
const getConfig = require('../../../templates/babel.config');
const {
  SCRIPT_ROOT,
  CONFIG_FILE,
  MSG_CONFIG,
  MSG_CONFIGBABEL,
  DEFAULT_ENCODING,
  VAR_FILE_PATH,
} = require('../../../constants');
const {
  resolvePath,
  blue,
  resolveInputPath,
  check,
  prettyJSON,
} = require('../../../utils');

async function generateBabelConfig(args) {
  const hasBabel = await check('babel');
  if (!hasBabel) {
    await fs.writeFile(
      resolvePath('.babelrc'),
      prettyJSON(getConfig(args)),
      DEFAULT_ENCODING
    );
    blue(MSG_CONFIGBABEL);
  }
}

module.exports = async function init(args) {
  const { babelrc } = args;
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
  if (babelrc) {
    await generateBabelConfig(args);
  }
};
