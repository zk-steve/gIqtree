const fs = require("fs");
const path = require("path");
const os = require("os");

const {iqtreePath} = require("../db")
const { assessment_mapping } = require("./mapping/assessment_mapping");
const { data_mapping } = require("./mapping/data_mapping");
const { dating_mapping } = require("./mapping/dating_mapping");
const { model_mapping } = require("./mapping/model_mapping");
const { other_mapping } = require("./mapping/other_mapping");
const { tree_search_mapping } = require("./mapping/tree_search_mapping");

const baseCommand = () => {
  let execName = os.type() === "Windows_NT" ? "iqtree2.exe" : "iqtree2";
    let iqtreeExecute = path.join(iqtreePath, execName);
    let prefix = os.type() === "Windows_NT"
      ? ""
    : `chmod 755 "${iqtreeExecute}" && `;
  console.log({baseCommand: prefix + `"${iqtreeExecute}" `})
  return prefix + `"${iqtreeExecute}"`
}

const mappingCommand = (object_model, input_path, output_path) => {
  return new Promise((resolve, reject) => {
    let data = "";
      //Step 1: Mapping data
      data += data_mapping(object_model);
      //Step 2: Mapping model
      data += model_mapping(object_model);
      //Step 3: Tree Search
      data += tree_search_mapping(object_model);
      //Step 4: Assessment
      data += assessment_mapping(object_model);
      //Step 5: Dating
      data += dating_mapping(object_model);
      //Step 6: Other
      data += other_mapping(object_model, output_path);
      // Step 7 - other/ enter command-line
      console.log({ data })
      let result = data.replace("-m MFP -n 0", "-m MF");
      result = result.replace("-m TEST -n 0", "-m TESTONLY");
      resolve(result);
  })
};


module.exports = {
  mappingCommand,
  baseCommand
}



// const listInput = (input_path) => {
//   return new Promise((resolve, reject) => {
//     fs.readdir(input_path, "utf-8", (err, files) => {
//       if (err) reject({message: "Does not get input files"});
//       if (Array.isArray(files)) {
//         let fileName = files.map((file) => {
//           return path.join(input_path, file);
//         });
//         console.log({ COMMAND_INPUT: fileName });
//         resolve(fileName);
//       }
//     });
//   })
// };

// '"C:\\Users\\nguye\\AppData\\iqtree\\iqtree-2.0.6-Windows\\bin\\iqtree2.exe" '
// '"C:\\Users\\nguye\\AppData\\iqtree\\iqtree-2.0.6-Windows\\bin\\iqtree2.exe" '