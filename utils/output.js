const path = require('node:path');
const { resolvePath, fromPackage } = require('rollup-scripts-utils');
const { getRsConfig } = require('./rs');

module.exports = {
  resolveOutputFields(args) {
    const { watch } = args;
    const { outputFormats = ['es', 'cjs'], outDir = 'dist' } =
      getRsConfig(args);
    const defaultFileName = 'index.js';
    // In watch mode output formats specified by rs.json or override rollup config will be ignored
    return (watch ? ['iife'] : outputFormats).reduce((obj, format) => {
      const packageField = ['es', 'esm'].includes(format)
        ? 'module'
        : format === 'cjs'
          ? 'main'
          : '';
      obj[format] = resolvePath(
        (packageField && fromPackage(packageField)) ||
          path.join(outDir, format, defaultFileName)
      );
      return obj;
    }, {});
  },
};
