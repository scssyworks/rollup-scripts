const { EXT_REGEX, OUT, ERR_OUTPUTFILE } = require('../constants');
const { fromPackage } = require('./getPackage');
const { resolvePath } = require('./resolvePath');
const { yellow } = require('./colors');

module.exports = {
  resolveOutputFields() {
    let main = fromPackage('main') ?? OUT;
    let mod = fromPackage('module') ?? main.replace(EXT_REGEX, '.mjs');
    if (main === mod) {
      yellow(ERR_OUTPUTFILE);
      main = main.replace(EXT_REGEX, '.js');
      mod = mod.replace(EXT_REGEX, '.mjs');
    }
    return { main: resolvePath(main), module: resolvePath(mod) };
  },
};
