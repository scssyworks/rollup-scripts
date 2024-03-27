const { isString } = require('./typeOf');

module.exports = {
  crossPath(path) {
    return isString(path) ? path.replace(/\\/g, '/') : '';
  },
};
