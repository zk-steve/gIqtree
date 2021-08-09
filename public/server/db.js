const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const isDev = require("electron-is-dev");
const fs = require("fs");
const os = require("os");

let dataPath;

const isWindows = () => {
  if (os.type === "Windows_NT") return true;
  return false;
}

if (isWindows) {
  dataPath = path.join("C:", "Users", os.userInfo().username, "AppData")
}

if (!fs.existsSync(dataPath)) {
  fs.mkdir(dataPath, { recursive: true }, (err) => {
    if (err) throw err;
    else {
      console.log("created");
      fs.writeFile("iqtree.sqlite3", (err) => {
        if (err) throw err;
        else {
          console.log("Created Database")
        }
      })
    }
  });
}

const storage = isWindows
  ? path.join(dataPath, "iqtree.sqlite3")
  : path.join(process.resourcesPath, "database", "iqtree.sqlite3");

const db = new sqlite3.Database(storage);
module.exports = db;