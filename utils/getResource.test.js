const fs = require('node:fs');
const path = require('node:path');
const { SCRIPT_NAME, DEFAULT_ENCODING, PKG } = require('../constants');
const {
  fromPackage,
  deps,
  jsxImportSource,
  getResource,
} = require('./getResource');
const { prettyJSON } = require('./prettyJSON');
const { cwd } = require('./env');

const tempFolder = path.join(cwd(), 'temp');
const mockResolvePath = jest.fn((file) => path.join(tempFolder, file));
jest.mock('./resolvePath', () => ({
  ...jest.requireActual('./resolvePath'),
  resolvePath: (file) => mockResolvePath(file),
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
    DEFAULT_ENCODING
  );
}

describe('getResource', () => {
  afterEach(() => {
    fs.unlinkSync(path.join(tempFolder, PKG));
    fs.rmdirSync(tempFolder);
    jest.resetModules();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  describe('fromPackage', () => {
    it('should return package field', () => {
      setup();
      expect(fromPackage('name')).toBe(SCRIPT_NAME);
    });
    it('should return NULL if package field is not defined', () => {
      setup();
      expect(fromPackage('unknownField')).toBeNull();
    });
  });

  describe('deps', () => {
    it('should return dependencies as list', () => {
      setup({ react: '1.0.0' });
      expect(
        deps(['dependencies', 'devDependencies', 'peerDependencies'])
      ).toEqual(['deps', 'react', 'devDeps']);
    });
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

  describe('getResource', () => {
    it('should get requested resource', () => {
      setup();
      expect(getResource(PKG)).toEqual(pkgJSON);
    });
    it('should return NULL if requested resource is not found', () => {
      setup();
      expect(getResource('tempResource')).toBeNull();
    });
  });
});
