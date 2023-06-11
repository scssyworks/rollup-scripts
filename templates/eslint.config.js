const { check, resolvePath } = require('../utils');
const babelConfig = require('../templates/babel.config');
const { configTypes } = require('../constants');

module.exports = async (args) => {
  const { typescript, react } = args;
  const eslintBaseRc = {
    env: {
      browser: true,
      node: true,
      es2022: true,
    },
    parserOptions: {
      sourceType: 'module',
      allowImportExportEverywhere: true,
      ecmaVersion: 'latest',
    },
    extends: ['eslint:recommended'],
  };

  if (typescript || react) {
    const babelFile = await check(configTypes.BABEL);
    const babelrc = !!babelFile;
    eslintBaseRc.parser = '@babel/eslint-parser';
    Object.assign(eslintBaseRc.parserOptions, {
      requireConfigFile: babelrc,
      babelOptions: {
        babelrc,
        configFile: babelrc ? resolvePath(babelFile) : false,
        ...(babelrc ? {} : babelConfig(args)),
      },
    });
    eslintBaseRc.plugins = ['@babel'];
    if (typescript) {
      eslintBaseRc.plugins.push('@typescript-eslint');
      eslintBaseRc.extends.push('plugin:@typescript-eslint/recommended');
    }
  }

  return eslintBaseRc;
};
