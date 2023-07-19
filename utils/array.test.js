const { wrapArray } = require('./array');

describe('Array', () => {
  describe('wrapArray', () => {
    it('should wrap input to an array', () => {
      expect(wrapArray(1)).toEqual([1]);
    });
    it('should NOT wrap a wrapped input', () => {
      expect(wrapArray([1])).toEqual([1]);
    });
  });
});
