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

const listInput = (input_path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(input_path, "utf-8", (err, files) => {
      if (err) reject({message: "Does not get input files"});
      if (Array.isArray(files)) {
        let fileName = files.map((file) => {
          return path.join(input_path, file);
        });
        console.log({ COMMAND_INPUT: fileName });
        resolve(fileName);
      }
    });
  })
};

// '"C:\\Users\\nguye\\AppData\\iqtree\\iqtree-2.0.6-Windows\\bin\\iqtree2.exe" '
// '"C:\\Users\\nguye\\AppData\\iqtree\\iqtree-2.0.6-Windows\\bin\\iqtree2.exe" '

const baseCommand = () => {
  let execName = os.type() === "Windows_NT" ? "iqtree2.exe" : "iqtree2";
    let iqtreeExecute = path.join(iqtreePath, execName);
    let prefix = os.type() === "Windows_NT"
      ? ""
    : `chmod 755 "${iqtreeExecute}" && `;
  console.log({baseCommand: prefix + `"${iqtreeExecute}" `})
  return prefix + `"${iqtreeExecute}" `
}

const mappingCommand = (object_model, input_path, output_path) => {
  return new Promise((resolve, reject) => {
    listInput(input_path).then((inputFiles) => {
      let data = "";
      //Step 1: Mapping data
      data += data_mapping(object_model, inputFiles);
      //Step 2: Mapping model
      data += model_mapping(object_model, inputFiles);
      //Step 3: Tree Search
      data += tree_search_mapping(object_model, inputFiles);
      //Step 4: Assessment
      data += assessment_mapping(object_model, inputFiles);
      //Step 5: Dating
      data += dating_mapping(object_model, inputFiles);
      //Step 6: Other
      data += other_mapping(object_model, inputFiles, output_path);
      // Step 7 - other/ enter command-line
      data.replace("-m MFP -n 0", "-m MF");
      data.replace("-m TEST -n 0", "-m TESTONLY");
      resolve(data);
    }).catch(err => {
      reject(err);
    })
  })
};

const example = {
  projectType: "assessment",
  data: {
    alignment: "path/alignment",
    partition: "path/partition",
    sequence: "autoDetect",
    codon: "codon1",
    partitionType: "edgeProportional",
  },
  model: {
    modelFinder: "auto",
    proportionOfInvariableSites: "no",
    rateCategories: "",
    rateCategoriesNumber: "4",
    autoMerge: "yes",
    mergingAlgorithm: "rclusterf",
    stateFrequency: "none",
  },
  tree: {
    on: "no",
    numberOfUnsuccessfulIterationsToStop: "100",
    perturbationStrength: "0.5",
    constrainedTreeFile: "path/constrainedTreeFile",
    referenceTree: "path/referenceTree",
  },
  assessment: {
    bootstrapMethod: "standard",
    ufbootOption: "no",
    multiPartitionSamplingStrategy: "SITE",
    singleBranchTest: {
      parametric: false,
      SHlike: false,
      aBayes: false,
      localBootstrap: false,
    },
    concordanceFactor: {
      gCF: "path/gCF",
      sCF: "",
    },
  },
  dating: {
    availableDateInfoType: "none",
    dateExtraction: "no",
    dateFile: "path/dateFile",
    branchContainingOutgroup: "autoDetect",
  },
  others: {
    numberOfCPUCores: "",
    prefix: "",
    enterCommandLine: "",
  },
};

// store(base_command)
mappingCommand(example, "D:/TestIQTREE/IQTREE/input", "D:/TestIQTREE/IQTREE/output").then((data) => {
  console.log(baseCommand() + data);
}).catch(err => console.log(err))


module.exports = {
  mappingCommand,
  baseCommand
}