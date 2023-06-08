module.exports = {
  prettyJSON(obj) {
    if (obj && typeof obj === 'object') {
      return JSON.stringify(obj, null, 2);
    }
    return '';
  },
};
