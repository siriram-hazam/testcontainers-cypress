let connectionString;

describe("Example Test with Postgres 2", () => {
  before(() => {
    cy.task("getConnectionString2").then((connStr) => {
      connectionString = connStr;
      cy.task("log2", `Connecting to: ${connectionString}`);
    });
  });

  it("connects to PostgreSQL database", () => {
    cy.task("queryDatabase2", {
      connectionString: connectionString,
      query: "SELECT 1",
    }).then((result) => {
      cy.task("log2", `Query result: ${JSON.stringify(result)}`);
    });
  });

  // it("should display data from the database", () => {
  //   cy.visit("http://localhost:8081");
  //   cy.contains("new_new_name").should("be.visible");
  // });

  // it("should edit data and reflect changes in the database", () => {
  //   cy.visit("http://localhost:8081");
  //   cy.contains("new_new_name").should("be.visible");
  //   cy.contains("Edit").click();
  //   cy.contains("new_new_new_name").should("be.visible");

  //   cy.task("queryDatabase", {
  //     connectionString: connectionString,
  //     query: "SELECT * FROM test_table WHERE name = 'new_new_new_name';",
  //   }).then((result) => {
  //     expect(result).to.have.length(1);
  //     expect(result[0].name).to.equal("new_new_new_name");
  //   });
  // });
});
