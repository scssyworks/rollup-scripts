const fs = require('node:fs');
const path = require('node:path');
const { react, typescript, cmd } = require('./argv');
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

function isValidCommand() {
  return ['build', 'test', 'lint'].includes(cmd);
}

function warnReact(isTsxFile) {
  if (isValidCommand()) {
    if (!react) {
      console.log(yellow(ERR_REACT(isTsxFile)));
      console.log(
        gray(`rollup-scripts build --react${isTsxFile ? ' --typescript' : ''}`)
      );
    } else if (isTsxFile) {
      warnTypescript(' --react');
    }
  }
}

function warnTypescript(ext) {
  if (isValidCommand()) {
    if (!typescript) {
      console.log(yellow(ERR_ENTRYTYPESCRIPT));
      console.log(gray(`rollup-scripts build --typescript${ext ? ext : ''}`));
    }
  }
}

module.exports = {
  resolveInput() {
    try {
      const srcFiles = fs.readdirSync(resolvePath('src'));
      if (srcFiles.length) {
        const entryFile = srcFiles.find((file) => INDEX_REGEX.test(file));
        if (entryFile) {
          const [ext] = entryFile.match(EXT_REGEX);
          if (['.jsx', '.tsx'].includes(ext)) {
            warnReact(ext === '.tsx');
          }
          if (ext === '.ts') {
            warnTypescript();
          }
          return resolvePath(path.join('src', entryFile));
        }
      }
      throw new Error(ERR_NOTFOUND);
    } catch (e) {
      if (isValidCommand()) {
        console.log(yellow(ERR_ENTRYFILE));
        console.log(gray('npx rollup-scripts init'));
      }
      return mjsSrc;
    }
  },
};
