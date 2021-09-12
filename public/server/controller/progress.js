const fs = require("fs");
const path = require("path");
const readline = require("readline");
const homepage = require("./homepage");
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

module.exports.getProgress = (project_id) => {
  return new Promise(async (resolve, reject) => {
    await homepage
      .getProjectById(project_id)
      .then((data) => {
        processLineByLine(path.join(data[0].path, "output", "output.log"))
          .then((data) => {
            console.log({ data })
            if (typeof(data) === "string") {
              reject({ message: data, status: 0 })
            }
            let result = { message: data, status: 1 };
            resolve(result);
          })
          .catch((err) => {
            reject({ message: "does not get project path", status: 0 });
          });
      })
      .catch((err) => {
        reject({ message: "does not get project path", status: 0 });
      });
  });
};
