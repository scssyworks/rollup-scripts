const {
  configTypes,
  ESLINT_TYPSCRIPT_EXTENSIONS,
  ESLINT_REACT_EXTENSIONS,
  ESLINT_DEFAULT_EXTENSIONS,
  ESLINT_PREACT_EXTENSIONS,
} = require('../constants');
const { check, resolvePath } = require('../utils');
const babelConfig = require('./babel.config');

module.exports = async (args) => {
  const { typescript, react, preact } = args;
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
    extends: ESLINT_DEFAULT_EXTENSIONS,
  };

  if (typescript || react || preact) {
    const babelFile = check(configTypes.BABEL);
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
      eslintBaseRc.extends.push(...ESLINT_TYPSCRIPT_EXTENSIONS);
      eslintBaseRc.settings = {
        'import/resolver': {
          typescript: true,
          node: true,
        },
      };
    }
    if (react) {
      eslintBaseRc.extends.push(...ESLINT_REACT_EXTENSIONS);
      eslintBaseRc.settings = Object.assign(eslintBaseRc.settings ?? {}, {
        react: {
          version: 'detect',
        },
      });
    }
    if (preact) {
      eslintBaseRc.extends.push(...ESLINT_PREACT_EXTENSIONS);
    }
  }

  return eslintBaseRc;
};
