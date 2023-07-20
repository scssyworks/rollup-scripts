function flatten(arr) {
  const flatArray = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      flatArray.push(...flatten(item));
    } else {
      flatArray.push(item);
    }
  });
  return flatArray;
}

module.exports = {
  flatten,
};
