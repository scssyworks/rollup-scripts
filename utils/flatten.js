function flatten(arr) {
  const flatArray = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      flatArray.push(...flatten(item));
    } else {
      flatArray.push(item);
    }
  }
  return flatArray;
}

module.exports = {
  flatten,
};
