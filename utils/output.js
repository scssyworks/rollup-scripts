const { EXT_REGEX, OUT } = require('../constants');
const { fromPackage } = require('../src');
const { resolvePath } = require('./resolvePath');

module.exports = {
  resolveOutputFields() {
    const main = resolvePath(fromPackage('main') ?? OUT);
    const module = resolvePath(
      fromPackage('module') ?? main.replace(EXT_REGEX, '.mjs')
    );
    return { main, module };
  },
};
