const path = require('node:path');
const { ROOT } = require('../constants');

function getPackage() {
    try {
        return require(path.join(ROOT, 'package.json'));
    } catch (e) {
        return null;
    }
}

function fromPackage(field) {
    const pkg = getPackage();
    return (pkg && pkg[field]) ?? null;
}

module.exports = {
    getPackage,
    fromPackage
};