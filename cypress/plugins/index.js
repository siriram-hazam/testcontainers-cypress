const testcontainerDbPlugin1 = require("./testcontainers_db");

module.exports = (on, config) => {
  testcontainerDbPlugin1(on, config);
};
