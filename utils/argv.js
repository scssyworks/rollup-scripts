const { CONFIG_FILE } = require('../constants');
const argv = require('yargs').argv;

module.exports = {
	cmd: argv._.find((c) => ['init', 'build', 'test', 'lint'].includes(c)),
	configFile: argv.configFile ?? CONFIG_FILE,
	typescript: argv.typescript,
	react: argv.react,
};
