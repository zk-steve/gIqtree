const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");
const os = require("os");
import axios from 'axios';
import decompress from 'decompress';

let URL_IQTREE;
let iqtreeName;

let dataPath;
let iqtreePath;

if (os.type() === "Windows_NT") {
  dataPath = path.join("C:", "Users", os.userInfo().username, "AppData", "iqtree")
  iqtreePath = path.join("C:", "Users", os.userInfo().username, "AppData", "iqtree", "iqtree-2.0.6-Windows", "bin");
  URL_IQTREE = 'https://github.com/Cibiv/IQ-TREE/releases/download/v2.0.6/iqtree-2.0.6-Windows.zip';
  iqtreeName = "iqtree-2.0.6-Windows.zip"
} else if (os.type() === "Linux") {
  dataPath = path.join("/home", os.userInfo().username, "iqtree")
  iqtreePath = path.join("/home", os.userInfo().username, "iqtree", "iqtree-2.0.6-Linux", "bin");
  URL_IQTREE = 'https://github.com/Cibiv/IQ-TREE/releases/download/v2.0.6/iqtree-2.0.6-Linux.tar.gz'
  iqtreeName = "iqtree-2.0.6-Linux.tar.gz"
} else if (os.type() === "Darwin") {
  dataPath = path.join("/Users", os.userInfo().username, "Library", "Application Support", "iqtree")
  iqtreePath = path.join("/Users", os.userInfo().username, "Library", "Application Support", "iqtree", "iqtree-2.0.6-MacOSX", "bin");
  URL_IQTREE = 'https://github.com/Cibiv/IQ-TREE/releases/download/v2.0.6/iqtree-2.0.6-MacOSX.zip'
  iqtreeName = "iqtree-2.0.6-MacOSX.zip"
}
const storage = path.join(dataPath, "iqtree.sqlite3")

//Create folder
if (!fs.existsSync(dataPath)) {
  fs.mkdir(dataPath, {recursive: true}, (err) => {
    if (err) throw err;
    console.log("created");
  });
}
setImmediate(
  // Download iqtree
  async () => {//Wrapping the code with an async function, just for the sake of example.
    if (!fs.existsSync(path.join(iqtreePath))) {
      fs.mkdirSync(dataPath, {
        recursive: true
      });
      try {
        let file = await axios.get(URL_IQTREE, {
          responseType: 'arraybuffer'
        }).then(res => res.data);
        await decompress(Buffer.from(file), path.join(dataPath));
        console.log('All done');
      } catch (error) {//IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
        //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
        console.log('Download failed',error)
      }
    }
})

const db = new sqlite3.Database(storage);
module.exports = {db, iqtreePath};