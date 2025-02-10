#!/usr/bin/env node
import yargs from 'yargs';
import type { Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';
import { CONFIG_FILE, SCRIPT_NAME } from '../constants/index.js';
import { type BuildOptions, LogLevel } from '../types/index.js';
import { build } from './scripts/build/index.js';
import { mergeConfig } from './utils/mergeConfig.js';

function addCommonOptions(yargs: Argv) {
  return yargs
    .option('emit', {
      type: 'string',
      describe: `Emit logs using one of the values: "${LogLevel.SILENT}", "${LogLevel.VERBOSE}". Default is "${LogLevel.SELECTIVE}".`,
      default: LogLevel.SELECTIVE,
      alias: 'e',
    })
    .option('config', {
      type: 'string',
      describe: `Path to configuration file. Default is "${CONFIG_FILE}".`,
      default: CONFIG_FILE,
      alias: 'c',
    })
    .option('config-file', {
      deprecate: 'Use "--config"',
      deprecated: true,
      type: 'string',
      describe: `Path to configuration file. Default is "${CONFIG_FILE}".`,
      default: CONFIG_FILE,
    });
}

yargs(hideBin(process.argv))
  .scriptName(SCRIPT_NAME)
  .usage('$0 <command> [args]')
  .command(
    'build',
    'Build JavaScript/TypeScriptlibrary',
    (argv: Argv) =>
      addCommonOptions(argv)
        .option('input', {
          type: 'string',
          describe: 'Path to input file',
          alias: 'i',
        })
        .option('src-root', {
          type: 'string',
          describe: 'Path to source root',
          alias: 's',
          default: 'src',
        })
        .option('out-dir', {
          type: 'string',
          describe: 'Path to output directory',
          alias: 'o',
          default: 'dist',
        })
        .option('output-formats', {
          type: 'array',
          describe: 'Output formats',
          alias: 'f',
          default: ['es', 'cjs'],
        })
        .option('watch', {
          type: 'boolean',
          describe: 'Enable watch mode',
          alias: 'w',
        }),
    mergeConfig<BuildOptions>(build),
  )
  .demandCommand(
    1,
    'Rollup script requires at least one command to run. Run `rollup-scripts --help` for more information',
  )
  .help().argv;
