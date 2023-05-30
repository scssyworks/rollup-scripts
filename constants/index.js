const fs = require('node:fs');
const path = require('node:path');

const ROOT = fs.realpathSync(process.cwd());
const SCRIPT_ROOT = path.resolve(__dirname, '../node_modules');

module.exports = {
    ROOT,
    SCRIPT_ROOT
};