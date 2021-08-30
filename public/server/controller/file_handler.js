const fs = require("fs");

module.exports.viewFile = (file_path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file_path, "utf-8", (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}