const fs = require('fs');

const ROOT = fs.realpathSync(process.cwd());

module.exports = {
    ROOT
};