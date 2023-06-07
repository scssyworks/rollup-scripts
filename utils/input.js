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
  ERR_ENTRYTYPESCRIPT,
  ERR_REACT,
} = require('../constants');

const mjsSrc = resolvePath('src/index.mjs');

function isValidCommand(cmd) {
  return EXEC_COMMANDS.includes(cmd);
}

function warnReact(isTsxFile, args) {
  const cmd = getCommand(args);
  const { react } = args;
  if (isValidCommand(cmd)) {
    if (!react) {
      yellow(ERR_REACT(isTsxFile));
      gray(`rollup-scripts build --react${isTsxFile ? ' --typescript' : ''}`);
    } else if (isTsxFile) {
      warnTypescript(' --react', args);
    }
  }
}

function warnTypescript(opt, args) {
  const cmd = getCommand(args);
  const { typescript } = args;
  if (isValidCommand(cmd)) {
    if (!typescript) {
      yellow(ERR_ENTRYTYPESCRIPT);
      gray(`rollup-scripts build --typescript${opt ? opt : ''}`);
    }
  }
}

module.exports = {
  resolveInput(args) {
    const cmd = getCommand(args);
    try {
      const srcFiles = fs.readdirSync(resolvePath('src'));
      if (srcFiles.length) {
        const entryFile = srcFiles.find((file) => INDEX_REGEX.test(file));
        if (entryFile) {
          const [ext] = entryFile.match(EXT_REGEX);
          if (['.jsx', '.tsx'].includes(ext)) {
            warnReact(ext === '.tsx', args);
          }
          if (ext === '.ts') {
            warnTypescript(null, args);
          }
          return resolvePath(path.join('src', entryFile));
        }
      }
      throw new Error(ERR_NOTFOUND);
    } catch (e) {
      if (isValidCommand(cmd)) {
        yellow(ERR_ENTRYFILE);
        gray('npx rollup-scripts init');
      }
      return mjsSrc;
    }
  },
};
