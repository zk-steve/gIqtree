module.exports = {
  projectType: "infertree",
  data: {
    alignment: "",
    partition: "",
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
    on: "yes",
    numberOfUnsuccessfulIterationsToStop: "100",
    perturbationStrength: "0.5",
    constrainedTreeFile: "",
    referenceTree: "",
  },
  assessment: {
    bootstrapMethod: "ufboot",
    bootstrapMethodReplicate: "0",
    ufbootOption: "no",
    multiPartitionSamplingStrategy: "SITE",
    singleBranchTest: {
      parametric: false,
      SHlike: false,
      aBayes: false,
      localBootstrap: false,
      SHlikeReplicate: "0",
      localBootstrapReplicate: "0",
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
