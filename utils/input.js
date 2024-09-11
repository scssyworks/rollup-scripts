const { readdirSync } = require('node:fs');
const { resolvePath, getLogger } = require('rollup-scripts-utils');
const path = require('node:path');
const { getCommand, EXEC_COMMANDS } = require('./argv');
const {
  INDEX_REGEX,
  ERR_NOTFOUND,
  ERR_ENTRYFILE,
  CMD_INIT,
  EXT_REGEX,
} = require('../constants');
const { jsxImportSource } = require('./getResource');
const { getRsConfig } = require('./rs');
const { isString } = require('./typeOf');

const mjsSrc = 'src/index.mjs';

function resolveInputPath(args) {
  const { srcRoot, input } = getRsConfig(args);
  const fromConfig = isString(input) && isString(srcRoot);
  const logger = getLogger(args);
  const cmd = getCommand(args);
  try {
    if (fromConfig) {
      return path.join(srcRoot, input);
    }
    const srcFiles = readdirSync(resolvePath(srcRoot));
    if (srcFiles.length) {
      const entryFile = srcFiles.find((file) => INDEX_REGEX.test(file));
      if (entryFile) {
        return path.join('src', entryFile);
      }
    }
    throw new Error(ERR_NOTFOUND);
  } catch (e) {
    if (EXEC_COMMANDS.includes(cmd) && !fromConfig) {
      logger.warn(ERR_ENTRYFILE);
      logger.muted(CMD_INIT);
    }
    logger.verbose(e);
    return mjsSrc;
  }
}

/**
 * Returns source type flags
 * @param {string} src Input path
 */
function getSourceType(src) {
  const importSource = jsxImportSource();
  const [react, preact] = ['react', 'preact'].map(
    (importType) => importSource === importType
  );
  const [ext] = src.match(EXT_REGEX) ?? ['.mjs'];
  const typescript = ['.ts', '.mts', '.cts', '.tsx'].includes(ext);
  return { react, preact, typescript };
}

module.exports = {
  getInputProps(args) {
    const src = resolveInputPath(args);
    return { input: resolvePath(src), src, sourceTypes: getSourceType(src) };
  },
};
