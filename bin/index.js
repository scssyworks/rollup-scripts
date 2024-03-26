#!/usr/bin/env node
const { build, init, lint, dev } = require('./rollup-scripts');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { CONFIG_FILE, SCRIPT_NAME } = require('../constants');

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
  yargs
    .option('silent', silentConfig)
    .option('verbose', verboseConfig)
    .option('configFile', {
      default: CONFIG_FILE,
      type: 'string',
      describe: 'Provide custom rollup configuration',
      alias: 'c',
    });

yargs(hideBin(process.argv))
  .scriptName(SCRIPT_NAME)
  .usage('$0 <cmd> [args]')
  .command(
    'build',
    'Build JavaScript/TypeScript library',
    addCommonOptions,
    build
  )
  .command(
    'dev',
    'Start bundler in watch mode for continuous development',
    addCommonOptions,
    dev
  )
  .command('init', 'Setup configuration files', addCommonOptions, init)
  .command(
    'lint',
    'Lint JS/TS files in your workspace',
    (yargs) =>
      addCommonOptions(yargs)
        .option('fix', {
          ...boolConfig,
          describe: 'Automatically fix lint errors',
          alias: 'f',
        })
        .option('formatter', {
          type: 'string',
          default: 'stylish',
          describe: 'Provide a custom formatter',
        }),
    lint
  )
  .demandCommand(
    1,
    'Rollup scripts require at least one command. Check --help for more details!'
  )
  .help().argv;
