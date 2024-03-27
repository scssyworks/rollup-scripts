module.exports = {
  isFunction: (value) => {
    return typeof value === 'function';
  },
  isString: (value) => {
    return typeof value === 'string';
  },
  isObject: (value) => {
    return value && typeof value === 'object';
  },
};
