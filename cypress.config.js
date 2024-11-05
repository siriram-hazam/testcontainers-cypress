const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("./cypress/plugins/index.js")(on, config);

      return config;
    },
    specPattern: "cypress/integration/*.cy.{js,jsx,ts,tsx}",
  },
});
