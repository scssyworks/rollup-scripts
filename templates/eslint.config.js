const { configTypes } = require('../constants');
const { check, resolvePath } = require('../utils');
const babelConfig = require('./babel.config');

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
    extends: ['eslint:recommended', 'plugin:import/recommended'],
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
    if (typescript) {
      eslintBaseRc.parser = '@typescript-eslint/parser';
      eslintBaseRc.extends.push(
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended'
      );
      eslintBaseRc.settings = {
        'import/resolver': {
          typescript: true,
          node: true,
        },
      };
    }
    if (react) {
      eslintBaseRc.extends.push(
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:jsx-a11y/recommended',
        'plugin:react-hooks/recommended'
      );
      eslintBaseRc.settings = Object.assign(eslintBaseRc.settings ?? {}, {
        react: {
          version: 'detect',
        },
      });
    }
  }

  return eslintBaseRc;
};
