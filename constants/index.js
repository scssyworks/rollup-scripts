const fs = require('node:fs');
const path = require('node:path');

const ROOT = fs.realpathSync(process.cwd());
const SCRIPT_ROOT = path.resolve(__dirname, '../');
const CONFIG_FILE = 'rs.config.js';
const OUT = 'dist/umd/output.js';

const EXT_REGEX = /\.(j|mj|cj|t)sx?$/;

module.exports = {
  ROOT,
  SCRIPT_ROOT,
  CONFIG_FILE,
  EXT_REGEX,
  OUT,
};
