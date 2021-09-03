const fs = require("fs");

const base_command = require("../base-command");

module.exports.storeSetting = (storePath) => {
    fs.writeFileSync(storePath, JSON.stringify(base_command), (err) => {
        if (err) throw err;
        console.log("created")
    })
}