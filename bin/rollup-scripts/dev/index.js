const { updateArgs } = require('../../../utils');
const build = require('../build');

module.exports = async function dev(args) {
  const finalArgs = updateArgs(args, { watch: true });
  return await build(finalArgs);
};
