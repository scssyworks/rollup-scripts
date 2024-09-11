const { externalize } = require('./externalize');

const mockDeps = jest.fn((keys) => (keys.length ? ['deps1', 'deps2'] : []));
jest.mock('rollup-scripts-utils', () => ({
  ...jest.requireActual('rollup-scripts-utils'),
  deps: (...args) => mockDeps(...args),
}));

describe('externalize', () => {
  beforeEach(() => {
    mockDeps.mockClear();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should return list of dependencies to be marked as external', () => {
    expect(externalize(['deps1', 'deps2'])).toEqual(['deps1', 'deps2']);
  });
  it('should return all dependencies marked as external', () => {
    expect(externalize('all')).toEqual([/^deps1/, /^deps2/]);
    expect(mockDeps).toHaveBeenCalledWith([
      'dependencies',
      'devDependencies',
      'peerDependencies',
    ]);
  });
  it('should return peer dependencies marked as external', () => {
    expect(externalize('peer')).toEqual([/^deps1/, /^deps2/]);
    expect(mockDeps).toHaveBeenCalledWith(['peerDependencies']);
  });
  it('should return no dependencies marked as external', () => {
    expect(externalize('none')).toEqual([]);
    expect(mockDeps).toHaveBeenCalledWith([]);
  });
});
