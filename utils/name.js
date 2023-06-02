const { EXT_REGEX } = require('../constants');
const { fromPackage } = require('./getPackage');

function toCamelCase(name) {
  //@TODO: Re-visit to optimize this algorithm
  const nameParts = name.toLowerCase().split('-');
  if (nameParts.length === 1) {
    return nameParts[0];
  }
  const modifiedParts = nameParts.map((part, index) => {
    if (index > 0) {
      return `${part.charAt(0).toUpperCase()}${part.substring(1)}`;
    }
    return part;
  });
  return modifiedParts.join('');
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
