const { deps } = require('rollup-scripts-utils');
const { JSX_MODULES, ERR_JSX_MODULE } = require('../constants');

function jsxImportSource() {
  const modules = deps(['dependencies']).filter((module) =>
    JSX_MODULES.includes(module),
  );
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
  jsxImportSource,
};
