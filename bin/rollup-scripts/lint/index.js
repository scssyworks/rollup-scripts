const { ESLint } = require('eslint');
const {
  check,
  resolvePath,
  getInputProps,
  updateArgs,
  getLogger,
  getRsConfig,
} = require('../../../utils');
const eslintConfig = require('../../../templates/eslint.config');
const {
  configTypes,
  MSG_LINT,
  MSG_LINTED,
  MSG_LINTER,
  ERR_SWC_ESLINT,
} = require('../../../constants');

module.exports = async function lint(args) {
  const logger = getLogger(args);
  const { srcRoot } = getRsConfig(args);
  const { sourceTypes } = getInputProps(args);
  const finalArgs = updateArgs(args, sourceTypes);
  logger.log(MSG_LINT);
  logger.timeStart(MSG_LINTED);
  const { fix, formatter: formatterType } = finalArgs;
  try {
    const useEslintrc = Boolean(check(configTypes.ESLINT));
    let errorCount = 0;
    let warningCount = 0;
    let totalFiles = 0;
    const overrideConfig = await eslintConfig(finalArgs);
    const eslint = new ESLint({
      useEslintrc,
      fix,
      ...(!useEslintrc ? { overrideConfig } : {}),
    });
    const results = await eslint.lintFiles(resolvePath(`${srcRoot}/**/*`));
    totalFiles = results.length;
    for (const result of results) {
      errorCount += result.errorCount;
      warningCount += result.warningCount;
    }
    const formatter = await eslint.loadFormatter(formatterType);
    const resultText = formatter.format(results);
    let hasErrors = false;
    if (errorCount > 0) {
      logger.error(MSG_LINTER(totalFiles, errorCount, warningCount));
      hasErrors = true;
    } else if (warningCount > 0) {
      logger.warn(MSG_LINTER(totalFiles, errorCount, warningCount));
    } else {
      logger.success(MSG_LINTER(totalFiles, errorCount, warningCount));
    }
    console.log(resultText);
    if (hasErrors) {
      throw new Error(''); // Throwing error to exit process with error code
    }
  } catch (e) {
    logger.verbose(e);
    process.exit(1);
  }
  logger.timeEnd(MSG_LINTED);
};
