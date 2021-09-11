const fs = require("fs")
const path = require("path")
const readline = require("readline")
const homepage = require("./homepage")

const processLineByLine = async(path) => {
    const fileStream = fs.createReadStream(path);
    
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    let progress = 0

    for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
        if (line.includes("****  TOTAL")) {
            progress = progress >= 0 && progress + 12 < 100
                ? progress + 12
                : progress
            return(progress)
        }
        if (line === "finished: true") {
            progress = 100
            return(progress)
        }
    }
    return progress
}

module.exports.getProgress = (project_id) => {
    console.log("getProgress")
    return new Promise(async (resolve, reject) => {
        await homepage.getProjectById(project_id)
        .then(data => {
            let progress = processLineByLine(path.join(data[0].path, "output", "output.log"))
            let result = {message: progress, status: 1}
            resolve(result)
        }).catch(err => {
            reject({message:"does not get project path" ,status:0})
        })
    })
}
