const { ESLint } = require('eslint');
const {
  check,
  resolvePath,
  blue,
  timeStart,
  timeEnd,
  green,
  red,
  yellow,
  resolveInput,
  updateArgs,
} = require('../../../utils');
const eslintConfig = require('../../../templates/eslint.config');
const {
  configTypes,
  MSG_LINT,
  MSG_LINTED,
  MSG_LINTER,
} = require('../../../constants');

module.exports = async function lint(args) {
  const { typescript, react } = resolveInput(args);
  const finalArgs = updateArgs(args, { typescript, react });
  blue(MSG_LINT);
  timeStart(MSG_LINTED);
  const eslintConfigFile = await check(configTypes.ESLINT);
  const { verbose, fix, formatter: formatterType } = finalArgs;
  try {
    let errorCount = 0;
    let warningCount = 0;
    let totalFiles = 0;
    const overrideConfig = await eslintConfig(finalArgs);
    const eslint = new ESLint({
      useEslintrc: !!eslintConfigFile,
      overrideConfig,
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
    if (errorCount > 0) {
      red(MSG_LINTER(totalFiles, errorCount, warningCount));
    } else if (warningCount > 0) {
      yellow(MSG_LINTER(totalFiles, errorCount, warningCount));
    } else {
      green(MSG_LINTER(totalFiles, errorCount, warningCount));
    }

    console.log(resultText);
  } catch (e) {
    if (verbose) {
      console.error(e);
    }
    process.exit(1);
  }
  timeEnd(MSG_LINTED);
};
