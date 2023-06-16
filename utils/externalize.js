const { deps } = require('./getPackage');

module.exports = {
  externalize() {
    const allDeps = deps(['dependencies', 'peerDependencies']);
    return allDeps.map((module) => new RegExp(`^${module}(\\/.+)*$`));
  },
};
