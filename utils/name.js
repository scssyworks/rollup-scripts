const { EXT_REGEX } = require('../constants');
const { fromPackage } = require('./getResource');

function toCamelCase(name) {
  return name.toLowerCase().replace(/-(\w)/g, (_, letter) => {
    return letter.toUpperCase();
  });
}

module.exports = {
  getName() {
    const packageName = fromPackage('name') ?? 'plugin';
    const packageNameParts = packageName.split(/[\/\\]/);
    const pluginName = packageNameParts[packageNameParts.length - 1];
    return toCamelCase(pluginName);
  },
  /**
   * Generates appropriate output file name for development and production
   * @param {string} name File name or path
   * @param {boolean} isDevelopment Development mode is on
   * @returns {string}
   */
  getOutputFileName(name, isDevelopment) {
    return name.replace(
      EXT_REGEX,
      (match) => `${isDevelopment ? '.development' : ''}${match}`
    );
  },
};
