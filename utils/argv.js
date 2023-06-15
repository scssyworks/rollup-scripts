const ALL_COMMANDS = ['init', 'build', 'test', 'lint'];
const EXEC_COMMANDS = ALL_COMMANDS.filter((cmd) => cmd !== 'init');

module.exports = {
  EXEC_COMMANDS,
  getCommand(argv) {
    return argv._.find((c) => ALL_COMMANDS.includes(c));
  },
  updateArgs(args, { typescript, react }) {
    return Object.assign(
      {},
      args,
      typescript ? { typescript } : {},
      react ? { react } : {}
    );
  },
};
