const { deps } = require('./getResource');

module.exports = {
  /**
   * Creates an external connfiguration
   * @param {string[] | 'all' | 'peer' | 'none'} external Package.json keys
   * @returns {(RegExp|string)[]}
   */
  externalize(external) {
    if (Array.isArray(external)) {
      return external;
    }
    const keys =
      external === 'all'
        ? ['dependencies', 'devDependencies', 'peerDependencies']
        : external === 'peer'
          ? ['peerDependencies']
          : [];
    return deps(keys).map((module) => new RegExp(`^${module}`));
  },
};
