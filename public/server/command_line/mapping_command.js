const { assessment_mapping } = require("./mapping/assessment_mapping");
const { data_mapping } = require("./mapping/data_mapping");
const { dating_mapping } = require("./mapping/dating_mapping");
const { model_mapping } = require("./mapping/model_mapping");
const { other_mapping } = require("./mapping/other_mapping");
const { tree_search_mapping } = require("./mapping/tree_search_mapping");

const listInput = (project_path) => {
  return ["hihi", "haha"];
};

const mappingCommand = (object_model, listInput, output_path) => {
  let data = "";
  //Step 1: Mapping data
  data += data_mapping(object_model, listInput("haha"));
  //Step 2: Mapping model
  data += model_mapping(object_model, listInput("haha"));
  //Step 3: Tree Search
  data += tree_search_mapping(object_model, listInput("haha"));
  //Step 4: Assessment
  data += assessment_mapping(object_model, listInput("haha"));
  //Step 5: Dating
  data += dating_mapping(object_model, listInput("haha"));
  //Step 6: Other
  data += other_mapping(object_model, listInput("haha"), "output_path");
  // Step 7 - other/ enter command-line
  data.replace("-m MFP -n 0", "-m MF");
  data.replace("-m TEST -n 0", "-m TESTONLY");
  return data;
};

const example = {
  type: "Find Model",
  data: {
    alignment: "",
    partition: "",
    sequence: "autoDetect",
    codon: "codon1",
    partitionType: "edgeProportional",
  },
  model: {
    modelFinder: "LC or JC69",
    proportionOfInvariableSites: "0",
    rateCategories: "Gamma",
    autoMerge: "no",
    mergingAlgorithm: "rclusterf",
  },
  tree: {
    on: "no",
    numberOfUnsuccessfulIterationsToStop: "101",
    perturbationStrength: "0.6",
    constrainedTreeFile: "dfsd",
    referenceTree: "dsf",
  },
  assessment: {
    bootstrapMethod: "none",
    ufbootOption: "no",
    multiPartitionSamplingStrategy: "SITE",
    singleBranchTest: {
      parametric: false,
      SHlike: false,
      aBayes: false,
      localBootstrap: false,
    },
    concordanceFactor: {
      gCF: "",
      sCF: "",
    },
  },
  dating: {
    availableDateInfoType: "none",
    dateExtraction: "no",
    dateFile: "",
    branchContainingOutgroup: "autoDetect",
  },
  others: {
    numberOfCPUCores: "",
    prefix: "",
    enterCommandLine: "",
  },
};

// store(base_command)
const data = mappingCommand(example, listInput, "hihi");
console.log(data);

module.exports.mappingCommand = mappingCommand;
