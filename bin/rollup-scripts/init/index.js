const fs = require('node:fs');
const path = require('node:path');
const { SCRIPT_ROOT, CONFIG_FILE } = require('../../../constants');
const { resolvePath, blue } = require('../../../utils');

module.exports = function init() {
  const template = path.join(SCRIPT_ROOT, 'templates', CONFIG_FILE);
  const configFile = resolvePath(CONFIG_FILE);
  if (!fs.existsSync(configFile)) {
    const configFileContent = fs.readFileSync(template, {
      encoding: 'utf-8',
    });
    fs.writeFileSync(configFile, configFileContent, {
      encoding: 'utf-8',
    });
    blue(`Created "${CONFIG_FILE}" in project root.`);
  } else {
    blue(`"${CONFIG_FILE}" already exists!`);
  }
};
