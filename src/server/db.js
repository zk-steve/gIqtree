const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const storage = path.join(__dirname, "/database", "iqtree.sqlite3");
const db = new sqlite3.Database(storage);

module.exports = db;
