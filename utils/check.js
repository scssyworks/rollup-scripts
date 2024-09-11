const { existsSync } = require('node:fs');
const { resolvePath, fromPackage } = require('rollup-scripts-utils');
const {
  ERR_NOTFOUND,
  configTypes,
  PKG,
  VALID_BABEL_FILES,
  VALID_ESLINTCONFIG_FILES,
  configFiles,
} = require('../constants');

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

function resolveFiles(configType) {
  switch (configType) {
    case configTypes.BABEL:
      return VALID_BABEL_FILES;
    case configTypes.ESLINT:
      return VALID_ESLINTCONFIG_FILES;
    case configTypes.SWC:
      return [configFiles.SWC];
  }
}

module.exports = {
  check(configType) {
    const filesToCheck = resolveFiles(configType);
    const configFile = filesToCheck.find((file) =>
      existsSync(resolvePath(file))
    );
    if (!configFile) {
      return checkPackageJSON(configType);
    }
    return configFile;
  },
};
