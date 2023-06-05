#!/usr/bin/env node
const { build, init } = require('./rollup-scripts');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { CONFIG_FILE } = require('../constants');

yargs(hideBin(process.argv))
  .scriptName('rollup-scripts')
  .usage('$0 <cmd> [args]')
  .command(
    'build',
    'Build rollup library',
    (yargs) => {
      return yargs
        .option('typescript', {
          default: false,
          describe: 'Enable typescript compilation',
          alias: 't',
        })
        .option('react', {
          default: false,
          describe: 'Enable react compilation',
          alias: 'r',
        })
        .option('configFile', {
          default: CONFIG_FILE,
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
    'Setup "rs.config.js" file',
    (yargs) => yargs,
    () => {
      init();
    }
  )
  .help().argv;
