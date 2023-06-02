module.exports = {
  env() {
    return Object.entries(process.env).reduce((prev, curr) => {
      const [key, value] = curr;
      prev[`process.env.${key}`] = JSON.stringify(value);
      return prev;
    }, {});
  },
};
