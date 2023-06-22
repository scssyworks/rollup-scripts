const { ESLint } = require('eslint');
const {
  check,
  resolvePath,
  resolveInput,
  updateArgs,
  getLogger,
} = require('../../../utils');
const eslintConfig = require('../../../templates/eslint.config');
const {
  configTypes,
  MSG_LINT,
  MSG_LINTED,
  MSG_LINTER,
} = require('../../../constants');

module.exports = async function lint(args) {
  const logger = getLogger(args);
  const { typescript, react, preact } = resolveInput(args);
  const finalArgs = updateArgs(args, { typescript, react, preact });
  logger.log(MSG_LINT);
  logger.timeStart(MSG_LINTED);
  const eslintConfigFile = await check(configTypes.ESLINT);
  const { fix, formatter: formatterType } = finalArgs;
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
      logger.error(MSG_LINTER(totalFiles, errorCount, warningCount));
    } else if (warningCount > 0) {
      logger.warn(MSG_LINTER(totalFiles, errorCount, warningCount));
    } else {
      logger.success(MSG_LINTER(totalFiles, errorCount, warningCount));
    }

    console.log(resultText);
  } catch (e) {
    logger.verbose(e);
    process.exit(1);
  }
  logger.timeEnd(MSG_LINTED);
};
