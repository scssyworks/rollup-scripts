const path = require('node:path');
const { ROOT } = require('../constants');

module.exports = {
  /**
   * Resolves path correctly in current working directory
   * @param {string} p Input path
   * @returns {string} Path relative to your workspace
   */
  resolvePath(p) {
    return path.join(ROOT, p);
  },
};
