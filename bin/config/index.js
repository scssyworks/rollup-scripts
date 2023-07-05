const { defineConfig } = require('rollup');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');
const replace = require('@rollup/plugin-replace');
const babelConfig = require('../../templates/babel.config');
const {
  getName,
  resolvePath,
  getOutputFileName,
  env,
  getInputProps,
  resolveOutputFields,
  externalize,
  opts,
  check,
  updateArgs,
  getLogger,
  getResource,
} = require('../../utils');
const { fileSize } = require('../../plugins');
const { MSG_BABELRC, configTypes, DEV } = require('../../constants');

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
  external: externalize(),
});

module.exports = async (args, lgr) => {
  const logger = getLogger(args, lgr);
  const { input, typescript, react, preact } = getInputProps(args, logger);
  const finalArgs = updateArgs(args, { typescript, react, preact });
  const babelFile = await check(configTypes.BABEL);
  const babelrc = !!babelFile;
  if (babelrc) {
    logger.log(MSG_BABELRC(babelFile));
  }
  const { configFile } = finalArgs;
  const confFunc = getResource(configFile);
  let finalConfig = Object.assign(defaultConfig, {
    input,
  });
  finalConfig.output = defaultConfig.output.map((outConf) => {
    const isDev = DEV.test(outConf.file);
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
      ...(babelrc ? {} : babelConfig(finalArgs)),
    }),
    fileSize(args, logger)
  );
  try {
    if (typeof confFunc === 'function') {
      finalConfig = await Promise.resolve(confFunc(defaultConfig));
    }
  } catch (e) {
    logger.verbose(e);
  }
  return finalConfig;
};
