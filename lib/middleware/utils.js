function parseSelectedFields(options) {
  const obj = {};

  if (!options) {
    return obj;
  }

  options.split(",").forEach(element => {
    obj[element] = 1;
  });

  return obj;
}

module.exports = parseSelectedFields;
