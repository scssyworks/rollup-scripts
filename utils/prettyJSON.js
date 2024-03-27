const { isObject } = require('./typeOf');

module.exports = {
  prettyJSON(obj) {
    return isObject(obj) ? JSON.stringify(obj, null, 2) : '';
  },
};
