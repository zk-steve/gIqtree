const fs = require("fs");
const path = require("path")

const homepage = require("./homepage");

module.exports.copyFilesInput = (fileName, filePath, project_id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let projectPath;
            await homepage.getProjectById(project_id).then((data) => {
                projectPath = path.join(data[0].path, "input");
            });

            for (let i = 0; i < filePath.length; i++) {
                let elementPath = path.join(projectPath, fileName[i]);
                fs.copyFile(filePath[i], elementPath, (err) => {
                    if (err) throw err;
                });
            }
            
            console.log({projectPath})
            fs.readdir(projectPath, "utf-8", (err, files) => {
                if (err) throw err;
                let fileName = files.map(file => {
                    return {
                        name: file,
                        path: path.join(projectPath, file)
                    }
                })
                console.log({ fileName })
                resolve(fileName);
            })
        } catch (err) {
            reject(err);
        }
    })
}