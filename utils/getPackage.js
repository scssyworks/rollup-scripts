const path = require('node:path');
const { ROOT, PKG, JSX_MODULES, ERR_JSX_MODULE } = require('../constants');

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

/**
 * Returns list of dependencies
 * @returns {string[]} List of dependencies
 */
function deps(keys = ['dependencies', 'devDependencies']) {
  const deps = [];
  for (const key of keys) {
    for (const dep of Object.keys(fromPackage(key) ?? {})) {
      if (!deps.includes(dep)) {
        deps.push(dep);
      }
    }
  }
  return deps;
}

function jsxImportSource() {
  const modules = deps().filter((module) => JSX_MODULES.includes(module));
  if (modules.length === 1) {
    return modules[0];
  }
  throw new Error(ERR_JSX_MODULE(modules));
}

module.exports = {
  getPackage,
  fromPackage,
  jsxImportSource,
  deps,
};
