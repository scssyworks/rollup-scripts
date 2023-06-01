const chalk = require('chalk');

module.exports = {
  blue(text) {
    return chalk.bold(chalk.blue(text));
  },
  red(text) {
    return chalk.bold(chalk.red(text));
  },
  green(text) {
    return chalk.bold(chalk.green(text));
  },
};
