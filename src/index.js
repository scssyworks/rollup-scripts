const { ROOT } = require("../constants");
const { resolvePath, getPackage, fromPackage } = require("../utils");

module.exports = {
    cwd: ROOT,
    resolvePath,
    getPackage,
    fromPackage
};