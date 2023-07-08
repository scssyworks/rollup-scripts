const { PKG, JSX_MODULES, ERR_JSX_MODULE } = require('../constants');
const { resolvePath } = require('./resolvePath');

function getResource(fileName) {
  try {
    return require(resolvePath(fileName));
  } catch (e) {
    return null;
  }
}

/**
 * Returns package.json field value
 * @param {string} field Field name
 * @returns {any}
 */
function fromPackage(field) {
  const pkg = getResource(PKG);
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
  if (modules.length === 0) {
    // No JSX library found
    return '';
  }
  if (modules.length === 1) {
    // JSX library found
    return modules[0];
  }
  // More than one JSX libraries found
  throw new Error(ERR_JSX_MODULE(modules));
}

module.exports = {
  getResource,
  fromPackage,
  jsxImportSource,
  deps,
};
