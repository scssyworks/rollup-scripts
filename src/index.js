const { ROOT } = require('../constants');
const {
  resolvePath,
  getPackage,
  fromPackage,
  getOutputFileName,
} = require('../utils');

module.exports = {
  cwd: ROOT,
  resolvePath,
  getPackage,
  fromPackage,
  getOutputFileName,
};
