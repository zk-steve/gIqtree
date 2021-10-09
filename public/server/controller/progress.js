const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { viewFile } = require("./file_handler");
const homepage = require("./homepage");
const { readSettingObject, filterNameSync } = require("./project");
let progress;
const processLineByLine = async (path) => {
  if (!progress) progress = 0;
  if (fs.existsSync(path)) {
    const fileStream = fs.createReadStream(path);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      if (line.includes("ERROR")) {
        return line;
      }
      if (line.includes("****  TOTAL")) {
        progress =
          progress >= 0 && progress + 12 < 100 ? progress + 12 : progress;
        return progress;
      }
      if (line === "Date and Time:") {
        progress = 100;
        return progress;
      }
    }
  }
  return progress;
};

module.exports.getProgress = (project_path) => {
  return new Promise(async (resolve, reject) => {
    readSettingObject(project_path)
      .then(object_model => {
        let outputLogPath = ""
        if (object_model["others"]["prefix"] !== "") {
          let output = filterNameSync(object_model["others"]["prefix"])
          outputLogPath = path.join(object_model["others"]["prefix"], `${output}.log`)
        }
        else {
          outputLogPath = path.join(project_path, "output", "output.log")
        }
        viewFile(outputLogPath)
          .then(file => {
            let data = file.data
            if (data[data.length - 1].includes("Date and Time:")) {
              resolve({doneStatus: 1, status: 1, data: data})
            }
            else {
              resolve({doneStatus: 0, status: 1, data: data})
            }
          })
          .catch(err => {
            reject({ message: "Something was wrong", status: 0 });
          })
      })
      .catch(err => {
        reject({ message: "Something was wrong", status: 0 });
      })
  });
};
