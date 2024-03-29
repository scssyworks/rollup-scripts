function inject(condition, plugin) {
  return condition ? [plugin] : [];
}

module.exports = {
  inject,
  injectBabel(args, plugin) {
    const { typescript, react, preact, watch } = args;
    return inject(!watch || react || preact || typescript, plugin);
  },
};
