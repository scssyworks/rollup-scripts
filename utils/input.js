const fs = require('node:fs');
const path = require('node:path');
const { getCommand, EXEC_COMMANDS } = require('./argv');
const { getLogger } = require('./colors');
const { resolvePath } = require('./resolvePath');
const {
  INDEX_REGEX,
  ERR_NOTFOUND,
  ERR_ENTRYFILE,
  EXT_REGEX,
  CMD_INIT,
} = require('../constants');
const { jsxImportSource } = require('./getPackage');

const mjsSrc = 'src/index.mjs';

function isValidCommand(cmd) {
  return EXEC_COMMANDS.includes(cmd);
}

function resolveInputPath(args, lgr) {
  const logger = getLogger(args, lgr);
  const cmd = getCommand(args);
  try {
    const srcFiles = fs.readdirSync(resolvePath('src'));
    if (srcFiles.length) {
      const entryFile = srcFiles.find((file) => INDEX_REGEX.test(file));
      if (entryFile) {
        const [ext] = entryFile.match(EXT_REGEX);
        return { src: path.join('src', entryFile), ext };
      }
    }
    throw new Error(ERR_NOTFOUND);
  } catch (e) {
    if (isValidCommand(cmd)) {
      logger.warn(ERR_ENTRYFILE);
      logger.muted(CMD_INIT);
    }
    logger.verbose(e);
    return { src: mjsSrc, ext: '.mjs' };
  }
}

module.exports = {
  resolveInput(args, lgr) {
    const { src, ext } = resolveInputPath(args, lgr);
    const importSource = jsxImportSource();
    const react = importSource === 'react';
    const preact = importSource === 'preact';
    const typescript = ['.ts', '.mts', '.cts', '.tsx'].includes(ext);
    return { input: resolvePath(src), src, ext, typescript, react, preact };
  },
};
