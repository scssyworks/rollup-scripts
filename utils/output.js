const path = require('node:path');
const { fromPackage } = require('./getResource');
const { resolvePath } = require('./resolvePath');
const { getRsConfig } = require('./rs');

module.exports = {
  resolveOutputFields(args) {
    const { outputFormats = ['es', 'cjs'], outDir = 'dist' } =
      getRsConfig(args);
    const defaultFileName = 'index.js';
    return outputFormats.reduce((obj, format) => {
      const packageField = ['es', 'esm'].includes(format)
        ? 'module'
        : format === 'cjs'
        ? 'main'
        : '';
      obj[format] = resolvePath(
        (packageField && fromPackage(packageField)) ||
          path.join(outDir, format, defaultFileName)
      );
      switch (format) {
        case 'es':
          obj['esm'] = obj[format];
          break;
        case 'esm':
          obj['es'] = obj[format];
        default:
          break;
      }
      return obj;
    }, {});
  },
};
