const { resolvePath } = require('rollup-scripts-utils');
const { CONFIG_FILE } = require('../constants');
const { resolveOutputFields } = require('./output');

jest.mock('rollup-scripts-utils', () => ({
  ...jest.requireActual('rollup-scripts-utils'),
  fromPackage: (key) =>
    key === 'main'
      ? 'dist/cjs/index.js'
      : key === 'module'
        ? 'dist/es/index.js'
        : '',
}));

const mockRsConfig = jest.fn();
jest.mock('./rs', () => ({
  ...jest.requireActual('./rs'),
  getRsConfig: () => mockRsConfig(),
}));

describe('output', () => {
  beforeEach(() => {
    mockRsConfig.mockClear();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  describe('resolveOutputFields', () => {
    it('should return output fields', () => {
      mockRsConfig.mockReturnValue({});
      expect(resolveOutputFields({ configFile: CONFIG_FILE })).toEqual({
        es: resolvePath('dist/es/index.js'),
        cjs: resolvePath('dist/cjs/index.js'),
      });
    });
    it('should return output fields for other formats', () => {
      mockRsConfig.mockReturnValue({
        outputFormats: ['es', 'cjs', 'umd', 'iife'],
      });
      expect(resolveOutputFields({ configFile: CONFIG_FILE })).toEqual({
        es: resolvePath('dist/es/index.js'),
        cjs: resolvePath('dist/cjs/index.js'),
        umd: resolvePath('dist/umd/index.js'),
        iife: resolvePath('dist/iife/index.js'),
      });
    });
  });
});
