const fs = require('node:fs');
const path = require('node:path');
const {
  SCRIPT_ROOT,
  CONFIG_FILE,
  MSG_CONFIG,
  ERR_CONFIG,
} = require('../../../constants');
const { resolvePath, blue, resolveInputPath } = require('../../../utils');

module.exports = function init(args) {
  const template = path.join(SCRIPT_ROOT, 'templates', CONFIG_FILE);
  const configFile = resolvePath(CONFIG_FILE);
  if (!fs.existsSync(configFile)) {
    const configFileContent = fs
      .readFileSync(template, {
        encoding: 'utf-8',
      })
      .replace('$$filePath$$', resolveInputPath(args).src);
    fs.writeFileSync(configFile, configFileContent, {
      encoding: 'utf-8',
    });
    blue(MSG_CONFIG(CONFIG_FILE));
  } else {
    blue(ERR_CONFIG(CONFIG_FILE));
  }
};
