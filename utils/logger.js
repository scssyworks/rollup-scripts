const chalk = require('chalk');
const { ERR_SILENT_VERBOSE } = require('../constants');

class Logger {
  constructor({ silent, verbose, watch }) {
    if (silent && verbose) {
      console.log(chalk.yellow(chalk.bold(ERR_SILENT_VERBOSE)));
    }
    this._silent = silent && !verbose;
    this._verbose = verbose;
    this._watch = watch;
  }
  print(text, info) {
    if (!this._silent) {
      const logs = [chalk.bold(text)];
      if (info) {
        logs.push(`(${chalk.yellow(info)})`);
      }
      console.log(...logs);
    }
  }
  log(text, info) {
    this.print(chalk.blue(text), info);
  }
  error(text, info) {
    this.print(chalk.red(text), info);
  }
  success(text, info) {
    this.print(chalk.green(text), info);
  }
  warn(text, info) {
    this.print(chalk.yellow(text), info);
  }
  muted(text, info) {
    this.print(chalk.gray(text), info);
  }
  verbose(text) {
    if (this._verbose) {
      console.error(text);
    }
  }
  timeStart(id) {
    console.time(chalk.bold(this._watch ? chalk.green(id) : chalk.blue(id)));
  }
  timeEnd(id) {
    console.timeEnd(chalk.bold(this._watch ? chalk.green(id) : chalk.blue(id)));
  }
}

const resolver = (function resolveLogger() {
  let logger;
  /**
   * @param {any} args Logger arguments
   * @returns {Logger}
   */
  return (args) => {
    if (logger) {
      return logger;
    }
    logger = new Logger(args);
    return logger;
  };
})();

module.exports = {
  Logger,
  /**
   * Returns a logger instance
   * @param {any} args Arguments
   * @param {Logger} logger Logger instance
   * @returns {Logger}
   */
  getLogger(args) {
    return resolver(args);
  },
};
