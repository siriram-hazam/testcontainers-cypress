const { Client } = require("pg");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:8081" }));

const port = 3001;
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

// GET request to fetch data
app.get("/api/data", async (req, res) => {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    const result = await client.query("SELECT * FROM test_table");
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).send("Error executing query");
  } finally {
    await client.end();
  }
});

// POST request to update data by ID
app.post("/api/data/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const client = new Client({ connectionString });
  try {
    await client.connect();
    await client.query("UPDATE test_table SET name = $1 WHERE id = $2", [
      name,
      id,
    ]);
    res.sendStatus(200);
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).send("Error executing query");
  } finally {
    await client.end();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
