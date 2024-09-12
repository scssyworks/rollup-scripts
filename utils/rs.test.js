const { CONFIG_FILE } = require('../constants');
const { getRsConfig } = require('./rs');

describe('rs', () => {
  it('should resolve config', () => {
    expect(getRsConfig({ configFile: CONFIG_FILE })).toEqual(
      require('../templates/rs.json'),
    );
  });
  it.todo('should resolve config from current workspace');
  it.todo('should throw error if config is not correctly resolved');
});
