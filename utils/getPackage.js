const path = require('node:path');
const { ROOT, PKG } = require('../constants');

/**
 * Returns package.json configuration
 * @typedef {import('./getPackage.ts').PackageJson} PackageJson
 * @returns {PackageJson}
 */
function getPackage() {
  try {
    return require(path.join(ROOT, PKG));
  } catch (e) {
    return null;
  }
}

/**
 * Returns package.json field value
 * @param {keyof PackageJson} field Field name
 * @returns {any}
 */
function fromPackage(field) {
  const pkg = getPackage();
  return pkg?.[field] ?? null;
}

module.exports = {
  getPackage,
  fromPackage,
};
