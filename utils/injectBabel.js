module.exports = {
  injectBabel(args, plugin) {
    const { typescript, react, preact, watch } = args;
    if (!watch || react || preact || typescript) {
      return [plugin];
    }
    return [];
  },
};
