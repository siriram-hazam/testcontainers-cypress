let connectionString;

describe("Example Test with Postgres 1", () => {
  before(() => {
    cy.task("getConnectionString").then((connStr) => {
      connectionString = connStr;
      cy.task("log", `Connecting to: ${connectionString}`);
    });
  });

  it("connects to PostgreSQL database", () => {
    cy.task("queryDatabase", {
      connectionString: connectionString,
      query: "SELECT 1",
    }).then((result) => {
      cy.task("log", `Query result: ${JSON.stringify(result)}`);
    });
  });

  it("creates table and inserts a new record", () => {
    cy.task("queryDatabase", {
      connectionString: connectionString,
      query: `
        CREATE TABLE IF NOT EXISTS test_table (
          id SERIAL PRIMARY KEY,
          name VARCHAR(50) NOT NULL
        );
      `,
    }).then(() => {
      cy.task("log", "Table created");

      cy.task("queryDatabase", {
        connectionString: connectionString,
        query: "INSERT INTO test_table (name) VALUES ('test_name');",
      }).then(() => {
        cy.task("log", "Data inserted");

        cy.task("queryDatabase", {
          connectionString: connectionString,
          query: "SELECT * FROM test_table;",
        }).then((result) => {
          cy.task("log", `Query result: ${JSON.stringify(result)}`);
          expect(result).to.have.length(1);
          expect(result[0].name).to.equal("test_name");
        });
      });
    });
  });

  it("updates a record", () => {
    cy.task("queryDatabase", {
      connectionString: connectionString,
      query: "UPDATE test_table SET name = 'new_name' WHERE id = 1;",
    }).then(() => {
      cy.task("log", "Data updated");

      cy.task("queryDatabase", {
        connectionString: connectionString,
        query: "SELECT * FROM test_table;",
      }).then((result) => {
        cy.task("log", `Query result: ${JSON.stringify(result)}`);
        expect(result).to.have.length(1);
        expect(result[0].name).to.equal("new_name");
      });
    });
  });
});
