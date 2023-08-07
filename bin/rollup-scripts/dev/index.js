const { updateArgs } = require('../../../utils');
const build = require('../build');

module.exports = async function dev(args) {
  const finalArgs = updateArgs(args, { isDevelopment: true });
  return await build(finalArgs);
};
