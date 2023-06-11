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
    if (react) {
      Object.assign(eslintBaseRc.parserOptions, {
        ecmaFeatures: {
          jsx: true,
        },
      });
    }
    if (typescript) {
      eslintBaseRc.parser = '@typescript-eslint/parser';
      eslintBaseRc.plugins = ['@typescript-eslint'];
      eslintBaseRc.extends.push('plugin:@typescript-eslint/recommended');
    }
  }

  return eslintBaseRc;
};
