const { ROOT } = require('../constants');
const { resolvePath, fromPackage, getOutputFileName } = require('../utils');

module.exports = {
  cwd: ROOT,
  resolvePath,
  fromPackage,
  getOutputFileName,
};
