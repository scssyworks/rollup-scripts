const { env } = require('./env');

describe('env', () => {
  beforeAll(() => {
    process.env.MOCK_ENV_TEST = 'test';
  });
  afterAll(() => {
    process.env.MOCK_ENV_TEST = undefined;
  });
  it('should return environment variables as a string map', () => {
    const envMap = env();
    expect('process.env.MOCK_ENV_TEST' in envMap).toBeTruthy();
    expect(envMap['process.env.MOCK_ENV_TEST']).toBe(JSON.stringify('test'));
  });
});
