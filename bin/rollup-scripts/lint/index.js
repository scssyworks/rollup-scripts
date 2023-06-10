const { ESLint } = require('eslint');
const { check, resolvePath } = require('../../../utils');
const eslintConfig = require('../../../templates/eslint.config');

module.exports = async function lint(args) {
  const eslintConfigFile = await check('eslintConfig');
  const { verbose, fix, formatter: formatterType } = args;
  try {
    const eslint = new ESLint({
      useEslintrc: !!eslintConfigFile,
      overrideConfig: eslintConfig(args),
      fix,
    });
    const results = await eslint.lintFiles(resolvePath('src/**/*'));
    const formatter = await eslint.loadFormatter(formatterType);
    const resultText = formatter.format(results);
    console.log(resultText);
  } catch (e) {
    if (verbose) {
      console.error(e);
    }
    process.exit(1);
  }
};
