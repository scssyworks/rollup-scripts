const { defineConfig } = require('rollup');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');
const replace = require('@rollup/plugin-replace');
const babelConfig = require('./babelConfig');
const {
  configFile,
  fromPackage,
  getName,
  resolvePath,
  getOutputFileName,
  env,
  resolveInput,
} = require('../../utils');
const { output } = require('../../constants');

const commonOutputConfig = {
  name: getName(),
  exports: 'named',
  sourcemap: true,
};

// Read configuration from current workspace. Default config file: rs.config.js
const defaultConfig = defineConfig({
  input: resolveInput(),
  output: [
    {
      ...commonOutputConfig,
      file: getOutputFileName(
        resolvePath(fromPackage('module') ?? output.es),
        true
      ),
      format: 'es',
    },
    {
      ...commonOutputConfig,
      file: getOutputFileName(
        resolvePath(fromPackage('main') ?? output.umd),
        true
      ),
      format: 'umd',
    },
    {
      ...commonOutputConfig,
      file: getOutputFileName(resolvePath(fromPackage('module') ?? output.es)),
      format: 'es',
      sourcemap: false,
      plugins: [terser()],
    },
    {
      ...commonOutputConfig,
      file: getOutputFileName(resolvePath(fromPackage('main') ?? output.umd)),
      format: 'umd',
      sourcemap: false,
      plugins: [terser()],
    },
  ],
  plugins: [
    replace({
      values: env(),
      preventAssignment: true,
      objectGuards: true,
    }),
    json(),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
      extensions: ['.js', '.ts'],
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.es6', '.es'],
      babelHelpers: 'runtime',
      ...babelConfig,
    }),
  ],
  external: Object.keys(fromPackage('dependencies') ?? {}),
});

module.exports = async () => {
  let configFn;
  let finalConfig = defaultConfig;
  try {
    configFn = require(resolvePath(configFile));
  } catch (e) {}

  if (typeof configFn === 'function') {
    finalConfig = await Promise.resolve(configFn(defaultConfig));
  }
  return finalConfig;
};
