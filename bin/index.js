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
  describe: 'Show full error logs',
  alias: 'v',
};

const typescriptConfig = {
  ...boolConfig,
  describe: 'Enable typescript compilation',
  alias: 't',
};

const reactConfig = {
  ...boolConfig,
  describe: 'Enable react compilation',
  alias: 'r',
};

yargs(hideBin(process.argv))
  .scriptName(SCRIPT_NAME)
  .usage('$0 <cmd> [args]')
  .command(
    'build',
    'Build JavaScript/TypeScript library',
    (yargs) => {
      return yargs
        .option('typescript', typescriptConfig)
        .option('react', reactConfig)
        .option('configFile', {
          default: CONFIG_FILE,
          type: 'string',
          describe: 'Provide custom rollup configuration',
          alias: 'c',
        })
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
        .option('typescript', typescriptConfig)
        .option('react', reactConfig)
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
        .option('verbose', verboseConfig)
        .option('formatter', {
          type: 'string',
          default: 'stylish',
          describe: 'Provide a custom formatter',
        })
        .option('typescript', typescriptConfig)
        .option('react', reactConfig);
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
