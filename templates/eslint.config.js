const { check } = require('yargs');
const babelConfig = require('../templates/babel.config');
const { configTypes } = require('../constants');

module.exports = async (args) => {
  const { typescript, react } = args;
  const eslintBaseRc = {
    env: {
      browser: true,
      node: true,
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
      babelOptions: {
        babelrc,
        ...(babelrc ? {} : babelConfig(args)),
      },
    });
  }

  return eslintBaseRc;
};
