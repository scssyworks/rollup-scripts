const { ESLint } = require('eslint');
const { check } = require('../../../utils');

module.exports = async function lint(args) {
  const eslintConfigFile = await check('eslintConfig');
  const { verbose, fix } = args;
  try {
    const eslint = new ESLint({
      useEslintrc: !!eslintConfigFile,
    });
  } catch (e) {
    if (verbose) {
      console.error(e);
    }
    process.exit(1);
  }
};
