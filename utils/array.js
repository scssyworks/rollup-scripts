module.exports = {
  wrapArray(item) {
    return Array.isArray(item) ? item : [item];
  },
};
