const fs = require('node:fs');
const path = require('node:path');
const { getCommand, EXEC_COMMANDS } = require('./argv');
const { yellow, gray } = require('./colors');
const { resolvePath } = require('./resolvePath');
const {
  INDEX_REGEX,
  ERR_NOTFOUND,
  ERR_ENTRYFILE,
  EXT_REGEX,
  CMD_INIT,
} = require('../constants');
const { deps } = require('./getPackage');

const mjsSrc = 'src/index.mjs';

function isValidCommand(cmd) {
  return EXEC_COMMANDS.includes(cmd);
}

function resolveInputPath(args) {
  const cmd = getCommand(args);
  const { verbose } = args;
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
      yellow(ERR_ENTRYFILE);
      gray(CMD_INIT);
    }
    if (verbose) {
      console.error(e);
    }
    return { src: mjsSrc, ext: '.mjs' };
  }
}

module.exports = {
  resolveInputPath,
  resolveInput(args) {
    const { src, ext } = resolveInputPath(args);
    const react = ['.jsx', '.tsx'].includes(ext) || deps().includes('react');
    const typescript = ['.ts', '.mts', '.cts', '.tsx'].includes(ext);
    return { input: resolvePath(src), src, ext, typescript, react };
  },
};
