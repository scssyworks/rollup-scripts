module.exports = ({ typescript, react }) => {
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

  return eslintBaseRc;
};
