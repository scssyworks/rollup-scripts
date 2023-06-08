const fs = require('node:fs/promises');
const { ROOT, SUPPORTED_BABEL_FILES } = require('../constants');

module.exports = {
  async checkBabel() {
    const rootFiles = await fs.readdir(ROOT);
    const babelFile = rootFiles.find((file) =>
      SUPPORTED_BABEL_FILES.some((reg) => reg.test(file))
    );
    return babelFile;
  },
};
