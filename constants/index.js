const fs = require('node:fs');
const path = require('node:path');

const ROOT = fs.realpathSync(process.cwd());
const SCRIPT_ROOT = path.resolve(__dirname, '../');
const CONFIG_FILE = 'rs.config.js';

module.exports = {
    ROOT,
    SCRIPT_ROOT,
    CONFIG_FILE
};