const argv = require('yargs').argv;

module.exports = {
    cmd: argv._[0],
    configFile: argv.configFile ?? 'rs.config.js',
    typescript: argv.typescript,
    react: argv.react
};