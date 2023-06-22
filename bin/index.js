#!/usr/bin/env node
const { build, init } = require('./rollup-scripts');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { CONFIG_FILE, SCRIPT_NAME } = require('../constants');
const lint = require('./rollup-scripts/lint');

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

const addCommonOptions = (yargs) =>
  yargs.option('silent', silentConfig).option('verbose', verboseConfig);

yargs(hideBin(process.argv))
  .scriptName(SCRIPT_NAME)
  .usage('$0 <cmd> [args]')
  .command(
    'build',
    'Build JavaScript/TypeScript library',
    (yargs) => {
      return addCommonOptions(yargs).option('configFile', {
        default: CONFIG_FILE,
        type: 'string',
        describe: 'Provide custom rollup configuration',
        alias: 'c',
      });
    },
    (args) => {
      build(args);
    }
  )
  .command(
    'init',
    'Setup configuration files',
    (yargs) => {
      return addCommonOptions(yargs);
    },
    (args) => {
      init(args);
    }
  )
  .command(
    'lint',
    'Lint JS/TS files in your workspace',
    (yargs) => {
      return addCommonOptions(yargs)
        .option('fix', {
          ...boolConfig,
          describe: 'Automatically fix lint errors',
          alias: 'f',
        })
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
  .demandCommand(
    1,
    'Rollup scripts require at least one command. Check --help for more details!'
  )
  .help().argv;
