const path = require('node:path');
const cwd = process.cwd();

// Read configuration from current workspace. Default config file: rs.config.js
const defaultConfig = {
    input: path.join(cwd, 'src/index.mjs'),
    output: [
        {
            file: path.join(cwd, 'dist/esm/output.mjs'),
            format: 'es'
        },
        {
            file: path.join(cwd, 'dist/umd/output.js'),
            format: 'umd'
        }
    ]
};

module.exports = async () => {
    let configFn;
    try {
        configFn = require(`${cwd}/rs.config.js`); // @TODO: Name has to be made configurable
    } catch (e) { }

    if (typeof configFn === 'function') {
        const updatedConfig = await Promise.resolve(configFn(defaultConfig, {
            cwd
        }));
        return updatedConfig;
    }
    return defaultConfig;
}