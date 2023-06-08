const { defineConfig } = require('rollup');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');
const replace = require('@rollup/plugin-replace');
const babelConfig = require('../../templates/babel.config');
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
  checkBabel,
  blue,
} = require('../../utils');
const { fileSize } = require('../../plugins');
const {
  MSG_BABELRC,
  MSG_BABELRC_NOTFOUND,
  MSG_CHECKBABEL,
} = require('../../constants');

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
      format: 'cjs',
    },
    {
      file: getOutputFileName(pjModule),
      format: 'es',
    },
    {
      file: getOutputFileName(pjMain),
      format: 'cjs',
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
  ],
  external: externalize(
    fromPackage('dependencies'),
    fromPackage('peerDependencies')
  ),
});

module.exports = async (args) => {
  const babelFile = await checkBabel();
  const babelrc = !!babelFile;
  if (babelrc) {
    blue(MSG_BABELRC(babelFile));
  }
  const { configFile } = args;
  let configFn;
  let finalConfig = Object.assign(defaultConfig, {
    input: resolveInput(args),
  });
  finalConfig.output = defaultConfig.output.map((outConf) => {
    const isDev = /\.development/.test(outConf.file);
    Object.assign(outConf, commonOutputConfig, {
      sourcemap: isDev,
      plugins: opts(!isDev, [terser()]),
    });
    return outConf;
  });
  finalConfig.plugins.push(
    babel({
      babelrc,
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.es6', '.es'],
      babelHelpers: 'runtime',
      skipPreflightCheck: true,
      ...(babelrc ? {} : babelConfig(args)),
    }),
    fileSize()
  );
  try {
    configFn = require(resolvePath(configFile));
  } catch (e) {}

  if (typeof configFn === 'function') {
    finalConfig = await Promise.resolve(configFn(defaultConfig));
  }
  return finalConfig;
};
