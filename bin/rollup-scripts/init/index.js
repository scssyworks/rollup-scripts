const fs = require('node:fs');
const path = require('node:path');
const { SCRIPT_ROOT, CONFIG_FILE } = require('../../../constants');
const { resolvePath } = require('../../../utils');

module.exports = function init() {
    const configFileContent = fs.readFileSync(path.join(SCRIPT_ROOT, 'templates', CONFIG_FILE), {
        encoding: 'utf-8'
    });
    fs.writeFileSync(resolvePath(CONFIG_FILE), configFileContent, {
        encoding: 'utf-8'
    });
}