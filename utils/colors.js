const chalk = require('chalk');

function bold(text, info) {
  const logs = [chalk.bold(text)];
  if (info) {
    logs.push(`(${chalk.yellow(info)})`);
  }
  console.log(...logs);
}

function timeStart(id) {
  console.time(chalk.bold(chalk.blue(id)));
}

function timeEnd(id) {
  console.timeEnd(chalk.bold(chalk.blue(id)));
}

module.exports = {
  blue(text, info) {
    bold(chalk.blue(text), info);
  },
  red(text, info) {
    bold(chalk.red(text), info);
  },
  green(text, info) {
    bold(chalk.green(text), info);
  },
  yellow(text, info) {
    bold(chalk.yellow(text), info);
  },
  gray(text, info) {
    bold(chalk.gray(text), info);
  },
  timeStart,
  timeEnd,
};
