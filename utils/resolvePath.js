const path = require('node:path');
const { ROOT } = require('../constants');

module.exports = {
    resolvePath(p) {
        return path.join(ROOT, p);
    }
}; 