const fs = require('node:fs/promises');
const {
  ROOT,
  SUPPORTED_BABEL_FILES,
  SUPPORTED_ESLINT_CONFIG_FILES,
  ERR_NOTFOUND,
  configTypes,
  PKG,
} = require('../constants');
const { fromPackage } = require('./getResource');

async function getRootFiles() {
  return await fs.readdir(ROOT);
}

function matchRegex(REGEX_ARR, file) {
  return REGEX_ARR.some((reg) => reg.test(file));
}

function checkPackageJSON(confType) {
  try {
    if (fromPackage(confType)) {
      return PKG;
    }
    throw new Error(ERR_NOTFOUND);
  } catch (e) {
    return null;
  }
}

function resolveRegex(configType) {
  switch (configType) {
    case configTypes.BABEL:
      return SUPPORTED_BABEL_FILES;
    case configTypes.ESLINT:
      return SUPPORTED_ESLINT_CONFIG_FILES;
  }
}

module.exports = {
  async check(configType) {
    const rootFiles = await getRootFiles();
    const configFile = rootFiles.find((file) =>
      matchRegex(resolveRegex(configType), file)
    );
    // If file does not exist then check if config exists in "package.json" file
    if (!configFile) {
      return checkPackageJSON(configType);
    }
    return configFile;
  },
};
