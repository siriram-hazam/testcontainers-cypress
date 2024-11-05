// cypress/plugins/testcontainer_combined.js
const fs = require("fs");
const path = require("path");
const { GenericContainer } = require("testcontainers");
const { Client } = require("pg");

async function buildAndStartContainer(dbName, hostPort, envPath) {
  console.log(`Starting container for ${dbName} on port ${hostPort}...`);
  const container = await new GenericContainer("postgres")
    .withEnvironment({
      POSTGRES_USER: "postgres",
      POSTGRES_PASSWORD: "123456789",
      POSTGRES_DB: dbName,
    })
    .withExposedPorts(5432)
    .withStartupTimeout(60000)
    .start();
  console.log(`Container for ${dbName} started on port ${hostPort}`);

  const dbHost = container.getHost();
  const dbPort = container.getMappedPort(5432);
  const connectionString = `postgres://postgres:123456789@${dbHost}:${dbPort}/${dbName}`;

  console.log(`Connection string for ${dbName}: ${connectionString}`);

  fs.writeFileSync(
    path.resolve(__dirname, envPath),
    `DATABASE_URL=${connectionString}`
  );

  return { container, connectionString };
}

module.exports = (on, config) => {
  let containers = {};

  on("before:run", async () => {
    console.log("Running before:run...");
    try {
      const result1 = await buildAndStartContainer(
        "test_db1",
        5433,
        "../../ui-test1/.env"
      );
      const result2 = await buildAndStartContainer(
        "test_db2",
        5434,
        "../../ui-test2/.env"
      );
      containers.db1 = result1.container;
      containers.db2 = result2.container;
      containers.connectionString1 = result1.connectionString;
      containers.connectionString2 = result2.connectionString;
      console.log("All containers started successfully");
    } catch (error) {
      console.error("Error starting containers:", error);
    }
  });

  on("after:run", async () => {
    console.log("Running after:run...");
    for (const key in containers) {
      if (containers[key] && typeof containers[key].stop === "function") {
        try {
          await containers[key].stop();
          console.log(`Container ${key} stopped successfully`);
        } catch (error) {
          console.error(`Error stopping container ${key}:`, error);
        }
      }
    }
  });

  on("task", {
    log1(message) {
      console.log(message);
      return null;
    },
    log2(message) {
      console.log(message);
      return null;
    },
    getConnectionString1() {
      return containers.connectionString1 || null;
    },
    getConnectionString2() {
      return containers.connectionString2 || null;
    },
    queryDatabase1({ query }) {
      const client = new Client({
        connectionString: containers.connectionString1,
      });
      return client
        .connect()
        .then(() => client.query(query))
        .then((res) => {
          client.end();
          return res.rows;
        })
        .catch((err) => {
          client.end();
          throw err;
        });
    },
    queryDatabase2({ query }) {
      const client = new Client({
        connectionString: containers.connectionString2,
      });
      return client
        .connect()
        .then(() => client.query(query))
        .then((res) => {
          client.end();
          return res.rows;
        })
        .catch((err) => {
          client.end();
          throw err;
        });
    },
  });
};
