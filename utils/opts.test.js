const { opts } = require('./opts');

describe('opts', () => {
  it('should return same array value if condition is truthy', () => {
    expect(opts(true, ['hello'])).toEqual(['hello']);
  });
  it('should return empty array value if condition is falsy', () => {
    expect(opts(false, ['hello'])).toEqual([]);
  });
});
