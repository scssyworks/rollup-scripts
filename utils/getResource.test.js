const fs = require('node:fs');
const path = require('node:path');
const { cwd } = require('rollup-scripts-utils');
const { SCRIPT_NAME, DEFAULT_ENCODING, PKG } = require('../constants');
const { jsxImportSource } = require('./getResource');
const { prettyJSON } = require('./prettyJSON');

const tempFolder = path.join(cwd(), 'temp');
const mockDeps = jest.fn();
jest.mock('rollup-scripts-utils', () => ({
  ...jest.requireActual('rollup-scripts-utils'),
  deps: (...args) => mockDeps(...args),
}));

const pkgJSON = {
  name: SCRIPT_NAME,
  dependencies: {
    deps: '1.0.0',
  },
  devDependencies: {
    devDeps: '1.0.0',
  },
  peerDependencies: {
    deps: '1.0.0',
  },
};

function setup(packages = {}) {
  const packageJsonContent = prettyJSON({
    ...pkgJSON,
    dependencies: {
      ...pkgJSON.dependencies,
      ...packages,
    },
  });
  fs.mkdirSync(tempFolder);
  fs.writeFileSync(
    path.join(tempFolder, PKG),
    packageJsonContent,
    DEFAULT_ENCODING,
  );
  mockDeps.mockReturnValue(Object.keys(packages));
}

describe('getResource', () => {
  afterEach(() => {
    mockDeps.mockClear();
    fs.unlinkSync(path.join(tempFolder, PKG));
    fs.rmdirSync(tempFolder);
    jest.resetModules();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  describe('jsxImportSource', () => {
    it('should get JSX import source', () => {
      setup({ react: '1.0.0' });
      expect(jsxImportSource()).toBe('react');
    });
    it('should get JSX import as empty string if there is no JSX dependency', () => {
      setup();
      expect(jsxImportSource()).toBe('');
    });
    it('should throw a conflict error if there are more than one JSX modules', () => {
      setup({ react: '1.0.0', preact: '1.0.0' });
      expect(() => jsxImportSource()).toThrow(Error);
    });
  });
});
