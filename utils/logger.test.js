const chalk = require('chalk');
const { getLogger, Logger } = require('./logger');

describe('logger', () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const timeSpy = jest.spyOn(console, 'time').mockImplementation(() => {});
  const timeEndSpy = jest
    .spyOn(console, 'timeEnd')
    .mockImplementation(() => {});
  afterAll(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
    timeSpy.mockRestore();
    timeEndSpy.mockRestore();
  });
  describe('getLogger', () => {
    it('should return instance of Logger', () => {
      expect(getLogger({})).toBeInstanceOf(Logger);
    });
    it('should return same instance if called second time', () => {
      expect(getLogger({})).toEqual(getLogger({}));
    });
    it('should print log messages in blue', () => {
      const logger = getLogger({});
      logger.log('test');
      expect(logSpy).toHaveBeenCalledWith(chalk.bold(chalk.blue('test')));
    });
    it('should print log message with additional info', () => {
      const logger = getLogger({});
      logger.log('test', 'additional info');
      expect(logSpy).toHaveBeenCalledWith(
        chalk.bold(chalk.blue('test')),
        `(${chalk.yellow('additional info')})`
      );
    });
    it('should print success messages in green', () => {
      const logger = getLogger({});
      logger.success('test');
      expect(logSpy).toHaveBeenCalledWith(chalk.bold(chalk.green('test')));
    });
    it('should print error message in red', () => {
      const logger = getLogger({});
      logger.error('test');
      expect(logSpy).toHaveBeenCalledWith(chalk.bold(chalk.red('test')));
    });
    it('should print warning message in yellow', () => {
      const logger = getLogger({});
      logger.warn('test');
      expect(logSpy).toHaveBeenCalledWith(chalk.bold(chalk.yellow('test')));
    });
    it('should print muted message in gray', () => {
      const logger = getLogger({});
      logger.muted('test');
      expect(logSpy).toHaveBeenCalledWith(chalk.bold(chalk.gray('test')));
    });
    it('should NOT print verbose message', () => {
      const logger = getLogger({});
      logger.verbose('test');
      expect(errorSpy).not.toHaveBeenCalled();
    });
    it('should allow time logs to output processing time', () => {
      const logger = getLogger({});
      logger.timeStart('test');
      logger.timeEnd('test');
      expect(timeSpy).toHaveBeenCalledWith(chalk.bold(chalk.blue('test')));
      expect(timeEndSpy).toHaveBeenCalledWith(chalk.bold(chalk.blue('test')));
    });
  });
  describe('Logger', () => {
    beforeEach(() => {
      logSpy.mockClear();
      errorSpy.mockClear();
      timeSpy.mockClear();
      timeEndSpy.mockClear();
    });
    it('should allow verbose configuration', () => {
      const logger = new Logger({ verbose: true });
      logger.verbose('test');
      expect(errorSpy).toHaveBeenCalledWith('test');
    });
    it('should allow silent configuration', () => {
      const logger = new Logger({ silent: true });
      logger.log('silent');
      logger.warn('silent');
      logger.error('silent');
      logger.muted('silent');
      logger.success('silent');
      logger.verbose('silent');
      expect(logSpy).toHaveBeenCalledTimes(0);
      expect(errorSpy).toHaveBeenCalledTimes(0);
    });
    it('should allow verbose option if both verbose and silent are enabled', () => {
      const logger = new Logger({ verbose: true, silent: true });
      logger.verbose('test');
      expect(errorSpy).toHaveBeenCalledWith('test');
    });
  });
});
