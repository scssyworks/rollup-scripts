/**
 * This file resolves "rs.json" config
 */

const fs = require('node:fs');
const { resolvePath, getLogger } = require('rollup-scripts-utils');

module.exports = {
  /**
   * Returns rs.json configuration
   * @param {any} args Rollup script arguments
   * @typedef {import('../templates/schemas/rs.schema').RsSchema} RsSchema
   * @returns {RsSchema}
   */
  getRsConfig(args) {
    const logger = getLogger(args);
    try {
      const { configFile } = args;
      const config = resolvePath(configFile);
      if (fs.existsSync(config)) {
        return require(config);
      }
      return require('../templates/rs.json');
    } catch (e) {
      logger.verbose(e);
    }
  },
};
