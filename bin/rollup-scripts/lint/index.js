const { ESLint } = require('eslint');
const {
  check,
  resolvePath,
  blue,
  timeStart,
  timeEnd,
  green,
} = require('../../../utils');
const eslintConfig = require('../../../templates/eslint.config');
const {
  configTypes,
  MSG_LINT,
  MSG_LINTED,
  MSG_LINTER,
} = require('../../../constants');

module.exports = async function lint(args) {
  blue(MSG_LINT);
  timeStart(MSG_LINTED);
  const eslintConfigFile = await check(configTypes.ESLINT);
  const { verbose, fix, formatter: formatterType } = args;
  try {
    let errorCount = 0;
    let warningCount = 0;
    let totalFiles = 0;
    const eslint = new ESLint({
      useEslintrc: !!eslintConfigFile,
      overrideConfig: eslintConfig(args),
      fix,
    });
    const results = await eslint.lintFiles(resolvePath('src/**/*'));
    totalFiles = results.length;
    results.forEach((result) => {
      errorCount += result.errorCount;
      warningCount += result.warningCount;
    });
    const formatter = await eslint.loadFormatter(formatterType);
    const resultText = formatter.format(results);
    green(MSG_LINTER(totalFiles, errorCount, warningCount));
    console.log(resultText);
    blue();
  } catch (e) {
    if (verbose) {
      console.error(e);
    }
    process.exit(1);
  }
  timeEnd(MSG_LINTED);
};
