const fs = require("fs");
const { filterName } = require("./project");

module.exports.viewFile = (file_path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file_path, "utf-8", (err, data) => {
            if (err) reject(err);
            filterName(file_path)
                .then(name => {
                    resolve({data, name})
                })
                .catch(err => {
                    reject({message: "Can not get file name", status: 0})
                })
        })
    })
}