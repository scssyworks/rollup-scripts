const path = require('node:path');
const { ROOT, PREFIX } = require('../constants');
const { calculateSize, getLogger } = require('../utils');

module.exports = {
  fileSize(args) {
    const logger = getLogger(args);
    return {
      name: 'fileSize',
      writeBundle: {
        async handler(opts, bundle) {
          if (opts && typeof opts.file === 'string' && bundle) {
            const filePath = opts.file.substring(0, opts.file.lastIndexOf('/'));
            const bundleNames = Object.keys(bundle);
            for (const name of bundleNames) {
              const fileType = bundle[name].type;
              const fileMap = bundle[name].map;
              if (fileType === 'chunk') {
                const actualPath = path.join(filePath, name);
                const relativePath = path.relative(ROOT, actualPath);
                const fileSize = await calculateSize(actualPath);
                logger.success(
                  `${PREFIX}${relativePath}${fileMap ? ' ⚡︎' : ''}`,
                  fileSize
                );
              }
            }
          }
        },
      },
    };
  },
};
