module.exports = {
  externalize(...args) {
    const allDeps = [];
    const external = [];
    for (const obj of args) {
      if (obj && typeof obj === 'object') {
        Object.keys(obj).forEach((module) => {
          if (!allDeps.includes(module)) {
            allDeps.push(module);
            external.push(new RegExp(`^${module}(\\/\.+)*$`));
          }
        });
      }
    }
    return external;
  },
};
