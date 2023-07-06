const ALL_COMMANDS = ['init', 'build', 'test', 'lint'];
const EXEC_COMMANDS = ALL_COMMANDS.filter((cmd) => cmd !== 'init');

module.exports = {
  EXEC_COMMANDS,
  /**
   * Resolves the current command
   * @param {any} argv
   * @returns {string}
   */
  getCommand(argv) {
    return argv._.find((c) => ALL_COMMANDS.includes(c));
  },
  updateArgs(args, additionalFlags) {
    return Object.assign({}, args, additionalFlags);
  },
};
