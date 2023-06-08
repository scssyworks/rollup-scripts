const { existsSync } = require('node:fs');
const fs = require('node:fs/promises');
const path = require('node:path');
const getConfig = require('../../config/babelConfig');
const {
  SCRIPT_ROOT,
  CONFIG_FILE,
  MSG_CONFIG,
  ERR_CONFIG,
} = require('../../../constants');
const {
  resolvePath,
  blue,
  resolveInputPath,
  checkBabel,
  prettyJSON,
} = require('../../../utils');

const encodingConfig = { encoding: 'utf-8' };

async function generateBabelConfig(args) {
  const hasBabel = await checkBabel();
  if (hasBabel) {
    await fs.writeFile(
      resolvePath('.babelrc'),
      prettyJSON(getConfig(args)),
      encodingConfig
    );
  }
}

module.exports = async function init(args) {
  const { babelrc } = args;
  const template = path.join(SCRIPT_ROOT, 'templates', CONFIG_FILE);
  const configFile = resolvePath(CONFIG_FILE);
  if (!existsSync(configFile)) {
    const configFileContent = await fs.readFile(template, encodingConfig);
    await fs.writeFile(
      configFile,
      configFileContent.replace('$$filePath$$', resolveInputPath(args).src),
      encodingConfig
    );
    blue(MSG_CONFIG(CONFIG_FILE));
  } else {
    blue(ERR_CONFIG(CONFIG_FILE));
  }
  if (babelrc) {
    await generateBabelConfig(args);
  }
};
