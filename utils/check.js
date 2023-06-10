const fs = require('node:fs/promises');
const {
  ROOT,
  SUPPORTED_BABEL_FILES,
  DEFAULT_ENCODING,
  SUPPORTED_ESLINT_CONFIG_FILES,
  ERR_NOTFOUND,
} = require('../constants');
const { resolvePath } = require('./resolvePath');

async function getRootFiles() {
  return await fs.readdir(ROOT);
}

function matchRegex(REGEX_ARR, file) {
  return REGEX_ARR.some((reg) => reg.test(file));
}

async function checkPackageJSON(confType) {
  const packageJsonFile = 'package.json';
  try {
    const rootPackageJson = await fs.readFile(
      resolvePath(packageJsonFile),
      DEFAULT_ENCODING
    );
    if (confType in JSON.parse(rootPackageJson)) {
      return packageJsonFile;
    }
    throw new Error(ERR_NOTFOUND);
  } catch (e) {
    return null;
  }
}

function resolveRegex(configType) {
  switch (configType) {
    case 'babel':
      return SUPPORTED_BABEL_FILES;
    case 'eslintConfig':
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
      return await checkPackageJSON(configType);
    }
    return configFile;
  },
};
