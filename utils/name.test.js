const { getName, getOutputFileName } = require('./name');

const mockFromPackage = jest.fn();
jest.mock('./getResource', () => ({
  ...jest.requireActual('./getResource'),
  fromPackage: () => mockFromPackage(),
}));

describe('name', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  describe('getName', () => {
    it('should return package.json name as camelized file name', () => {
      mockFromPackage.mockReturnValue('my-plugin');
      expect(getName()).toBe('myPlugin');
    });
    it('should return "plugin" as file name if package.json does not define a name property', () => {
      mockFromPackage.mockReturnValue(undefined);
      expect(getName()).toBe('plugin');
    });
  });
  describe('getOutputFileName', () => {
    it('should return the same name as input if production mode is enabled', () => {
      expect(getOutputFileName('fileName.ts')).toBe('fileName.ts');
    });
    it('should return development file name if production mode is disabled', () => {
      expect(getOutputFileName('fileName.ts', true)).toBe(
        'fileName.development.ts'
      );
    });
  });
});
