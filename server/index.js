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

app.get("/crop", (req, res) => {
    const db = new Database("./database/GardenManager.db", { verbose: console.log });
    const stmt = db.prepare('SELECT * FROM Crop');
    const crop = stmt.all();

    res.send(crop);
});

app.get("/variety", (req, res) => {
    const db = new Database("./database/GardenManager.db", { verbose: console.log });
    const stmt = db.prepare('SELECT * FROM Variety');
    const variety = stmt.all();

    res.send(variety);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
