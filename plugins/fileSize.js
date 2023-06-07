const path = require('node:path');
const { ROOT } = require('../constants');
const { green, calculateSize, yellow } = require('../utils');

module.exports = {
  fileSize() {
    return {
      name: 'fileSize',
      writeBundle: {
        async handler(opts, bundle) {
          if (opts && typeof opts.file === 'string' && bundle) {
            const filePath = opts.file.substring(0, opts.file.lastIndexOf('/'));
            const bundleNames = Object.keys(bundle);
            for (const name of bundleNames) {
              const actualPath = path.join(filePath, name);
              const relativePath = path.relative(ROOT, actualPath);
              const fileType = bundle[name].type;
              const fileSize = await calculateSize(actualPath);
              console.log(
                green(`[${fileType}] → ${relativePath}`),
                yellow(`(${fileSize})`)
              );
            }
          }
        },
      },
    };
  },
};
