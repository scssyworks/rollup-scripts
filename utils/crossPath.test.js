const { crossPath } = require('./crossPath');

describe('crossPath', () => {
  it('should replace windows path format with unix path format', () => {
    expect(crossPath('path\\to\\something')).toBe('path/to/something');
    expect(crossPath('c:\\path\\to\\something')).toBe('c:/path/to/something');
  });
  it('should return empty string for invalid values', () => {
    expect(crossPath(null)).toBe('');
  });
});
