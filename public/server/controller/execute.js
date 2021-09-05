const fs = require("fs");
const path = require("path");

module.exports.getOutputWhenExecuted = (project_path) => {
    console.log({ project_path });
    let outputFolder = path.join(project_path, "output");
    return new Promise((resolve, reject) => {
        fs.readdir(outputFolder, "utf-8", (err, files) => {
            if (err) reject(err);
            let fileName = files.map(file => {
                return {
                    name: file,
                    path: path.join(outputFolder, file)
                }
            })
            console.log({OutputExecuted: fileName})
            resolve(fileName);
        })
    })
}