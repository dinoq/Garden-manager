const express = require("express");
const Database = require("better-sqlite3");
const cors = require("cors");

const app = express();
const port = 3001;

const corsOption = {
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/vegetable", (req, res) => {
  const db = new Database("./database/GardenManager.db", { verbose: console.log });
  const stmt = db.prepare('SELECT * FROM Vegetable');
  const vegetable = stmt.all();

  res.send(vegetable);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
