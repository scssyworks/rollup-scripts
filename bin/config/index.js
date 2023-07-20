const rollupConfig = require('../../templates/rollup.config');

module.exports = async (args) => {
  return await rollupConfig(args);
};
