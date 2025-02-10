const { defineConfig } = require('rollup');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');
const terser = require('@rollup/plugin-terser');
const { babel } = require('@rollup/plugin-babel');
const yaml = require('@rollup/plugin-yaml');
const graphql = require('@rollup/plugin-graphql');
const babelConfig = require('./babel.config');
const {
  getOutputFileName,
  resolveOutputFields,
  env,
  externalize,
  check,
  getRsConfig,
  getLogger,
  getInputProps,
  updateArgs,
  getResource,
  getName,
  isFunction,
} = require('../utils');
const { configTypes, MSG_BABELRC } = require('../constants');
const { fileSize } = require('../plugins');

module.exports = async (args) => {
  const { external, globals, rollupConfig } = getRsConfig(args);
  const logger = getLogger(args);
  const filePaths = resolveOutputFields(args);
  const babelrc = Boolean(check(configTypes.BABEL));
  // Resolve input
  const { input, sourceTypes } = getInputProps(args);
  const finalArgs = updateArgs(args, sourceTypes);
  if (babelrc) {
    logger.log(MSG_BABELRC);
  }
  try {
    const defaultConfig = defineConfig({
      input,
      output: [
        ...Object.keys(filePaths).flatMap((format) => {
          const commonConf = {
            name: getName(),
            exports: 'named',
            format,
            ...(['iife', 'umd'].includes(format) ? { globals } : {}),
          };
          return [
            {
              file: getOutputFileName(filePaths[format], true),
              sourcemap: true,
              ...commonConf,
            },
            {
              file: getOutputFileName(filePaths[format]),
              plugins: [terser()],
              ...commonConf,
            },
          ];
        }),
      ],
      plugins: [
        replace({
          values: env(),
          preventAssignment: true,
          objectGuards: true,
        }),
        json(),
        yaml(),
        graphql(),
        nodeResolve(),
        commonjs({
          include: 'node_modules/**',
          extensions: ['.js', '.ts'],
        }),
        babel({
          babelrc,
          exclude: 'node_modules/**',
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.es6', '.es'],
          babelHelpers: 'runtime',
          skipPreflightCheck: true,
          ...(babelrc ? {} : babelConfig(finalArgs)),
        }),
        fileSize(args),
      ],
      external: externalize(external),
    });

    // Check if rollup config path is provided
    const rollupConfigFunc = getResource(rollupConfig);
    if (isFunction(rollupConfigFunc)) {
      return await Promise.resolve(rollupConfigFunc(defaultConfig));
    }
    return defaultConfig;
  } catch (e) {
    logger.verbose(e);
  }
};
