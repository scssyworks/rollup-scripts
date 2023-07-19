const { getCommand, updateArgs } = require('./argv');

describe('Argv', () => {
  describe('getCommand', () => {
    it('should return supported command', () => {
      expect(getCommand({ _: ['build'] })).toBe('build');
      expect(getCommand({ _: ['lint'] })).toBe('lint');
      expect(getCommand({ _: ['init'] })).toBe('init');
      expect(getCommand({ _: ['test'] })).toBe('test');
      expect(getCommand({ _: ['build', 'lint', 'test'] })).toBe('build');
    });
  });

  describe('updateArgs', () => {
    it('should update arguments with updated props', () => {
      expect(updateArgs({ arg: 'hello' }, { updatedArg: 'world' })).toEqual({
        arg: 'hello',
        updatedArg: 'world',
      });
    });
  });
});
