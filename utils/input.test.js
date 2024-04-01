const { resolvePath } = require('rollup-scripts-utils');
const { getInputProps } = require('./input');

const mockRsConfig = jest.fn();
jest.mock('./rs', () => ({
  ...jest.requireActual('./rs'),
  getRsConfig: () => mockRsConfig(),
}));

jest.mock('rollup-scripts-utils', () => ({
  ...jest.requireActual('rollup-scripts-utils'),
  getLogger: () => ({
    warn: () => {},
    muted: () => {},
    verbose: () => {},
  }),
}));

jest.mock('./getResource', () => ({
  ...jest.mock('./getResource'),
  jsxImportSource: () => 'react',
}));

const mockReaddirSync = jest.fn();
jest.mock('node:fs', () => ({
  ...jest.requireActual('node:fs'),
  readdirSync: () => mockReaddirSync(),
}));

describe('input', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  beforeEach(() => {
    mockRsConfig.mockClear();
    mockReaddirSync.mockClear();
  });
  describe('getInputProps', () => {
    it('should resolve input and source types if configuration is not defined', () => {
      mockRsConfig.mockReturnValue({ srcRoot: 'src' });
      mockReaddirSync.mockReturnValue(['index.js']);
      expect(getInputProps({ _: ['build'] })).toEqual({
        src: 'src/index.js',
        input: resolvePath('src/index.js'),
        sourceTypes: { react: true, typescript: false, preact: false },
      });
    });
    it('should resolve input and source types from configuration if it is defined', () => {
      mockRsConfig.mockReturnValue({ srcRoot: 'src', input: 'index.ts' });
      mockReaddirSync.mockReturnValue(['index.js']); // This will ensure that file name is picked from config and not automatically detected
      expect(getInputProps({ _: ['build'] })).toEqual({
        src: 'src/index.ts',
        input: resolvePath('src/index.ts'),
        sourceTypes: { react: true, typescript: true, preact: false },
      });
    });
    it('should resolve input and source types to defaults if the file is not index file', () => {
      mockRsConfig.mockReturnValue({ srcRoot: 'src' });
      mockReaddirSync.mockReturnValue(['test.js']);
      expect(getInputProps({ _: ['build'] })).toEqual({
        src: 'src/index.mjs',
        input: resolvePath('src/index.mjs'),
        sourceTypes: { react: true, typescript: false, preact: false },
      });
    });
    it('should resolve input and source types to defaults if the file is not found', () => {
      mockRsConfig.mockReturnValue({ srcRoot: 'src' });
      mockReaddirSync.mockReturnValue([]);
      expect(getInputProps({ _: ['build'] })).toEqual({
        src: 'src/index.mjs',
        input: resolvePath('src/index.mjs'),
        sourceTypes: { react: true, typescript: false, preact: false },
      });
    });
  });
});
