const fs = require('node:fs');
const path = require('node:path');

const ROOT = fs.realpathSync(process.cwd());
const SCRIPT_ROOT = path.resolve(__dirname, '../');
const CONFIG_FILE = 'rs.config.js';
const OUT = 'dist/umd/output.js';

const EXT_REGEX = /\.(j|mj|cj|t)sx?$/;
const INDEX_REGEX = /index\.(j|mj|cj|t)sx?$/;

const ERR_NOTFOUND = 'File not found!';
const ERR_ENTRYFILE =
  'Warning: Entry file not detected automatically. Run the following command to configure entry file.';
const ERR_ENTRYTYPESCRIPT =
  'Warning: Entry file seems to be a "TypeScript" module. Pass --typescript to enable Typescript compilation.';
const ERR_REACT = (isTsxFile) =>
  `Warning: Entry file seems to be a "${
    isTsxFile ? 'TypeScript ' : ''
  }React" module. Pass --react${
    isTsxFile ? ' and --typescript' : ''
  } to enable React compilation.`;

module.exports = {
  ROOT,
  SCRIPT_ROOT,
  CONFIG_FILE,
  EXT_REGEX,
  INDEX_REGEX,
  OUT,
  ERR_NOTFOUND,
  ERR_ENTRYFILE,
  ERR_ENTRYTYPESCRIPT,
  ERR_REACT,
};
