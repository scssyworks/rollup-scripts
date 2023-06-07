const { defineConfig } = require('rollup');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');
const replace = require('@rollup/plugin-replace');
const babelConfig = require('./babelConfig');
const {
  fromPackage,
  getName,
  resolvePath,
  getOutputFileName,
  env,
  resolveInput,
  resolveOutputFields,
  externalize,
  opts,
} = require('../../utils');
const { fileSize } = require('../../plugins');

const commonOutputConfig = {
  name: getName(),
  exports: 'named',
  sourcemap: true,
};

const { main: pjMain, module: pjModule } = resolveOutputFields();

const defaultConfig = defineConfig({
  output: [
    {
      file: getOutputFileName(pjModule, true),
      format: 'es',
    },
    {
      file: getOutputFileName(pjMain, true),
      format: 'umd',
    },
    {
      file: getOutputFileName(pjModule),
      format: 'es',
    },
    {
      file: getOutputFileName(pjMain),
      format: 'umd',
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
    fileSize(),
  ],
  external: externalize(
    fromPackage('dependencies'),
    fromPackage('peerDependencies')
  ),
});

module.exports = async (args) => {
  const { configFile, react } = args;
  let configFn;
  let finalConfig = Object.assign(defaultConfig, {
    input: resolveInput(args),
  });
  finalConfig.output = defaultConfig.output.map((outConf) => {
    const isDev = /development/.test(outConf.file);
    Object.assign(outConf, commonOutputConfig, {
      sourcemap: isDev,
      plugins: [
        babel({
          babelrc: false,
          exclude: 'node_modules/**',
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.es6', '.es'],
          babelHelpers: 'runtime',
          skipPreflightCheck: true,
          ...babelConfig(args, outConf.format, !isDev),
        }),
        ...opts(!isDev, [terser()]),
      ],
    });
    if (react) {
      outConf.globals = {
        react: 'React',
      };
    }
    return outConf;
  });
  try {
    configFn = require(resolvePath(configFile));
  } catch (e) {}

  if (typeof configFn === 'function') {
    finalConfig = await Promise.resolve(configFn(defaultConfig));
  }
  return finalConfig;
};
