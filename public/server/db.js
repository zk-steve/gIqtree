const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");
const os = require("os");

let dataPath;

if (os.type() === "Windows_NT") {
  dataPath = path.join("C:", "Users", os.userInfo().username, "AppData")
}
else if (os.type() === "Linux") {
  dataPath = path.join("home", os.userInfo().username)
}
else if (os.type() === "Darwin") {
  //dataPath = path.join()
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

const storage = path.join(dataPath, "iqtree.sqlite3")

const db = new sqlite3.Database(storage);
module.exports = db;