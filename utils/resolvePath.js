const path = require('node:path');
const { cwd } = require('./env');

module.exports = {
  /**
   * Resolves path correctly in current working directory
   * @param {string} p Input path
   * @returns {string} Path relative to your workspace
   */
  resolvePath(p) {
    return path.join(cwd(), p);
  },
};
