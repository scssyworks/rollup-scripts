const path = require('node:path');
const { resolvePath } = require('./resolvePath');
const { ROOT } = require('../constants');

describe('resolvePath', () => {
  it('should convert relative paths to cwd into absolute paths', () => {
    expect(resolvePath('./test.js')).toBe(path.join(ROOT, './test.js'));
  });
  it('should convert relative paths to absolute paths', () => {
    expect(resolvePath('/test.js')).toBe(path.join(ROOT, '/test.js'));
  });
  it('should convert file names to absolute paths', () => {
    expect(resolvePath('test.js')).toBe(path.join(ROOT, 'test.js'));
  });
});
