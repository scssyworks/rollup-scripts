#!/usr/bin/env node
const { build, init } = require('./rollup-scripts');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { CONFIG_FILE, SCRIPT_NAME } = require('../constants');
const lint = require('./rollup-scripts/lint');
const test = require('./rollup-scripts/test');

const boolConfig = {
  default: false,
  type: 'boolean',
};

const verboseConfig = {
  ...boolConfig,
  describe: 'Show complete logs',
  alias: 'v',
};

const silentConfig = {
  ...boolConfig,
  describe: 'Suppress rollup scripts output logs',
  alias: 's',
};

yargs(hideBin(process.argv))
  .scriptName(SCRIPT_NAME)
  .usage('$0 <cmd> [args]')
  .command(
    'build',
    'Build JavaScript/TypeScript library',
    (yargs) => {
      return yargs
        .option('configFile', {
          default: CONFIG_FILE,
          type: 'string',
          describe: 'Provide custom rollup configuration',
          alias: 'c',
        })
        .option('silent', silentConfig)
        .option('verbose', verboseConfig);
    },
    (args) => {
      build(args);
    }
  )
  .command(
    'init',
    'Setup configuration files',
    (yargs) => {
      return yargs
        .option('silent', silentConfig)
        .option('verbose', verboseConfig);
    },
    (args) => {
      init(args);
    }
  )
  .command(
    'lint',
    'Lint JS/TS files in your workspace',
    (yargs) => {
      return yargs
        .option('fix', {
          ...boolConfig,
          describe: 'Automatically fix lint errors',
          alias: 'f',
        })
        .option('silent', silentConfig)
        .option('verbose', verboseConfig)
        .option('formatter', {
          type: 'string',
          default: 'stylish',
          describe: 'Provide a custom formatter',
        });
    },
    (args) => {
      lint(args);
    }
  )
  .command(
    'test',
    'Test JS/TS files in your workspace',
    (yargs) => yargs,
    (args) => {
      test(args);
    }
  )
  .demandCommand(
    1,
    'Rollup scripts require at least one command. Check --help for more details!'
  )
  .help().argv;
