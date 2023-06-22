const { deps } = require('./getPackage');

module.exports = {
  /**
   * Creates an external connfiguration
   * @param {string[]} keys Package.json keys
   * @returns {RegExp[]}
   */
  externalize(keys = ['dependencies', 'peerDependencies']) {
    return deps(keys).map((module) => new RegExp(`^${module}`));
  },
};
