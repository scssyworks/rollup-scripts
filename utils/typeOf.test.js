const { isFunction, isString, isObject } = require('./typeOf');

describe('typeOf', () => {
  describe('isFunction', () => {
    it('should return true if value is a function', () => {
      expect(isFunction(() => {})).toBeTruthy();
    });
    it('should return false if value is not a function', () => {
      expect(isFunction('value')).toBeFalsy();
      expect(isFunction(null)).toBeFalsy();
      expect(isFunction()).toBeFalsy();
      expect(isFunction(true)).toBeFalsy();
      expect(isFunction(Number.NaN)).toBeFalsy();
    });
  });

  describe('isString', () => {
    it('should return true if value is a string', () => {
      expect(isString('value')).toBeTruthy();
    });
    it('should return false if value is not a string', () => {
      expect(isString(() => {})).toBeFalsy();
      expect(isString(null)).toBeFalsy();
      expect(isString()).toBeFalsy();
      expect(isString(true)).toBeFalsy();
      expect(isString(Number.NaN)).toBeFalsy();
    });
  });

  describe('isObject', () => {
    it('should return true if value is an object', () => {
      expect(isObject({})).toBeTruthy();
      expect(isObject(new Object())).toBeTruthy();
      expect(isObject([])).toBeTruthy();
    });
    it('should return false if value is not an object', () => {
      expect(isObject('value')).toBeFalsy();
      expect(isObject(null)).toBeFalsy();
      expect(isObject()).toBeFalsy();
      expect(isObject(true)).toBeFalsy();
      expect(isObject(Number.NaN)).toBeFalsy();
    });
  });
});
