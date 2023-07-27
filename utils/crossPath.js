module.exports = {
  crossPath(path) {
    return typeof path === 'string' ? path.replace(/\\/g, '/') : '';
  },
};
