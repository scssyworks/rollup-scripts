const { configTypes } = require('../constants');
const { check } = require('./check');

const mockExistsSync = jest.fn();
jest.mock('node:fs', () => ({
  ...jest.requireActual('node:fs'),
  existsSync: (path) => mockExistsSync(path),
}));

const mockFromPackage = jest.fn();
jest.mock('./getResource', () => ({
  ...jest.requireActual('./getResource'),
  fromPackage: () => mockFromPackage(),
}));

describe('check', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  beforeEach(() => {
    mockExistsSync.mockClear();
    mockFromPackage.mockClear();
  });
  it('should check for valid babel config file', () => {
    const fileName = '.babelrc';
    mockExistsSync.mockImplementation((path) => path.includes(fileName));
    expect(check(configTypes.BABEL)).toBe(fileName);
  });
  it('should check for valid eslint config file', () => {
    const fileName = '.eslintrc.js';
    mockExistsSync.mockImplementation((path) => path.includes(fileName));
    expect(check(configTypes.ESLINT)).toBe(fileName);
  });
  it('should check for config in package.json if config file is not found', () => {
    const fileName = 'package.json';
    mockExistsSync.mockReturnValue(null);
    mockFromPackage.mockReturnValue(true);
    expect(check(configTypes.BABEL)).toBe(fileName);
  });
  it('should return NULL if workspace config is not found', () => {
    mockExistsSync.mockReturnValue(null);
    mockFromPackage.mockReturnValue(false);
    expect(check(configTypes.BABEL)).toBeNull();
  });
});
