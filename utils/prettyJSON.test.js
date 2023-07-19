const { prettyJSON } = require('./prettyJSON');

describe('prettyJSON', () => {
  it('should return prettified JSON', () => {
    expect(prettyJSON({ test: 'hello world' })).toBe(
      JSON.stringify({ test: 'hello world' }, null, 2)
    );
  });
  it('should return empty string if input value is not a valid object', () => {
    expect(prettyJSON(null)).toBe('');
  });
});
