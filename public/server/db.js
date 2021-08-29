const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");
const os = require("os");

let mainSource = path.join(__dirname, "model");

let dataPath;
let iqtreePath;

if (os.type() === "Windows_NT") {
  dataPath = path.join("C:", "Users", os.userInfo().username, "AppData", "iqtree")
  iqtreePath = path.join("C:", "Users", os.userInfo().username, "AppData", "iqtree", "bin");
} else if (os.type() === "Linux") {
  dataPath = path.join("/home", os.userInfo().username, "iqtree")
  iqtreePath = path.join("/home", os.userInfo().username, "iqtree", "bin");
} else if (os.type() === "Darwin") {
  dataPath = path.join("/Users", os.userInfo().username, "Library", "Application Support", "iqtree")
  iqtreePath = path.join("/Users", os.userInfo().username, "Library", "Application Support", "iqtree", "bin");
}
const storage = path.join(dataPath, "iqtree.sqlite3")

if (!fs.existsSync(dataPath)) {
  fs.mkdir(dataPath, {recursive: true}, (err) => {
    if (err) throw err;
    console.log("created");
  });
}

if (fs.existsSync(mainSource)) {
  fs.mkdir(iqtreePath, {recursive: true}, (err) => {
    if (err) throw err;
    else {
      console.log("creater iqtree bin");
      fs.readdir(mainSource, "utf-8", (err, files) => {
        if (err) throw err;
        else {
          files.forEach(file => {
            let sourcePath = path.join(mainSource, file);
            let destPath = path.join(iqtreePath, file);
            fs.copyFile(sourcePath, destPath, (err) => {
              if (err) throw err;
            })
          })
        }
      })
    }
  })
}


const db = new sqlite3.Database(storage);
module.exports = {db, iqtreePath};