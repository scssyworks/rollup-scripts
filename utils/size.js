const fs = require('node:fs/promises');

module.exports = {
  async calculateSize(path) {
    const stats = await fs.stat(path);
    if (stats.size < 1000) {
      return `${stats.size.toFixed(1)} bytes`;
    }
    const sizeInKb = (stats.size / 1024).toFixed(1);
    if (sizeInKb < 1000) {
      return `${sizeInKb} kb`;
    }
    const sizeInMb = (sizeInKb / 1024).toFixed(1);
    if (sizeInMb < 1000) {
      return `${sizeInMb} mb`;
    }
    return `${(sizeInMb / 1024).toFixed(1)} gb`;
  },
};
