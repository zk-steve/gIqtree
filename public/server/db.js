const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const isDev = require("electron-is-dev");

const storage = isDev
  ? path.join(__dirname, "/database", "iqtree.sqlite3")
  : path.join(process.resourcesPath, "database", "iqtree.sqlite3");

const db = new sqlite3.Database(storage);
module.exports = db;
