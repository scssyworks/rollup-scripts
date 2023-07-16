const fs = require('node:fs');
const path = require('node:path');

const SCRIPT_NAME = 'rollup-scripts';

const PREFIX = '✔️ ';

const PKG = 'package.json';

const DEFAULT_ENCODING = {
  encoding: 'utf-8',
};

const configTypes = {
  BABEL: 'babel',
  ESLINT: 'eslintConfig',
};

const configFiles = {
  BABEL: '.babelrc',
  ESLINT: '.eslintrc.json',
};

const JSX_MODULES = ['react', 'preact'];

const ROOT = fs.realpathSync(process.cwd());
const SCRIPT_ROOT = path.resolve(__dirname, '../');
const CONFIG_FILE = 'rs.json';
const OUT = 'dist/umd/output.js';

const EXT_REGEX = /\.(j|mj|cj|t|mt|ct)sx?$/;
const INDEX_REGEX = /index\.(j|mj|cj|t|mt|ct)sx?$/;

const VAR_FILE_PATH = '$$filePath$$';

const DEV = /\.development/;

const SUPPORTED_BABEL_FILES = [
  /^babel\.config\.(j|t|mj|cj|ct)s$/,
  /^babel\.config\.json$/,
  /^\.babelrc\.(j|t|mj|cj|ct)s$/,
  /^\.babelrc\.json$/,
  /^\.babelrc$/,
];

const VALID_BABEL_FILES = [
  'babel.config.js',
  'babel.config.ts',
  'babel.config.mjs',
  'babel.config.cjs',
  'babel.config.cts',
  'babel.config.json',
  '.babelrc',
  '.babelrc.js',
  '.babelrc.ts',
  '.babelrc.mjs',
  '.babelrc.cjs',
  '.babelrc.cts',
  '.babelrc.json',
];

const SUPPORTED_ESLINT_CONFIG_FILES = [
  /^\.eslintrc\.(j|cj)s$/,
  /^\.eslintrc\.(y|ya)ml$/,
  /^\.eslintrc\.json$/,
];

const VALID_ESLINTCONFIG_FILES = [
  '.eslintrc.js',
  '.eslintrc.cjs',
  '.eslintrc.yml',
  '.eslintrc.yaml',
  '.eslintrc.json',
];

const MSG_INIT = 'Initializing...';
const MSG_LINT = 'Linting...';
const MSG_COMPILE = 'Compiling...';
const MSG_COMPILED = 'Compiled in';
const MSG_LINTED = 'Completed in';
const MSG_LINTER = (totalFiles, errorCount, warningCount) =>
  `Checked ${totalFiles} files! Found ${errorCount} errors and ${warningCount} warnings.`;
const MSG_EMITTED = 'Emitted:';
const MSG_BABELRC = 'Using babel config from workspace';
const MSG_CONFIG = (filename) => `${PREFIX}${filename}`;
const MSG_CONFIGBABEL = `${PREFIX}.babelrc`;
const MSG_CONFIGESLINT = `${PREFIX}.eslintrc.json`;
const ERR_NOTFOUND = 'File not found!';
const ERR_ENTRYFILE =
  'Warning: Input file could not be resolved. Using "index.mjs" as default. Run the following command to configure "input" if you feel this is not right:';
const ERR_SILENT_VERBOSE =
  'Warning: "--verbose" is currently enabled. "--silent" will be ignored!';
const CMD_INIT = `npx ${SCRIPT_NAME} init`;
const ERR_JSX_MODULE = (modules) =>
  `More than one JSX runtime detected ==> ${modules.join(', ')}`;

const ESLINT_DEFAULT_EXTENSIONS = [
  'eslint:recommended',
  'plugin:import/recommended',
];

const ESLINT_TYPSCRIPT_EXTENSIONS = [
  'plugin:import/typescript',
  'plugin:@typescript-eslint/recommended',
];

const ESLINT_REACT_EXTENSIONS = [
  'plugin:react/recommended',
  'plugin:react/jsx-runtime',
  'plugin:jsx-a11y/recommended',
  'plugin:react-hooks/recommended',
];

const ESLINT_PREACT_EXTENSIONS = ['preact'];

module.exports = {
  DEV,
  ROOT,
  JSX_MODULES,
  SCRIPT_ROOT,
  CONFIG_FILE,
  EXT_REGEX,
  INDEX_REGEX,
  OUT,
  ERR_JSX_MODULE,
  ERR_NOTFOUND,
  ERR_ENTRYFILE,
  ERR_SILENT_VERBOSE,
  SUPPORTED_BABEL_FILES,
  SUPPORTED_ESLINT_CONFIG_FILES,
  MSG_EMITTED,
  MSG_COMPILE,
  MSG_COMPILED,
  MSG_BABELRC,
  MSG_CONFIG,
  MSG_CONFIGBABEL,
  MSG_CONFIGESLINT,
  MSG_LINT,
  MSG_LINTED,
  MSG_LINTER,
  MSG_INIT,
  CMD_INIT,
  SCRIPT_NAME,
  DEFAULT_ENCODING,
  VAR_FILE_PATH,
  configTypes,
  configFiles,
  PKG,
  ESLINT_DEFAULT_EXTENSIONS,
  ESLINT_TYPSCRIPT_EXTENSIONS,
  ESLINT_REACT_EXTENSIONS,
  ESLINT_PREACT_EXTENSIONS,
  VALID_BABEL_FILES,
  VALID_ESLINTCONFIG_FILES,
};
