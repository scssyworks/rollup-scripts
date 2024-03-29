const path = require('node:path');
const { resolvePath } = require('./resolvePath');
const { cwd } = require('./env');

describe('resolvePath', () => {
  it('should convert relative paths to cwd into absolute paths', () => {
    expect(resolvePath('./test.js')).toBe(path.join(cwd(), './test.js'));
  });
  it('should convert relative paths to absolute paths', () => {
    expect(resolvePath('/test.js')).toBe(path.join(cwd(), '/test.js'));
  });
  it('should convert file names to absolute paths', () => {
    expect(resolvePath('test.js')).toBe(path.join(cwd(), 'test.js'));
  });
});
