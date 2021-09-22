module.exports = {
  data: {
    alignment: "",
    partition: "",
    sequence: "autoDetect",
    codon: "codon1",
    partitionType: "edgeProportional",
  },
  model: {
    modelFinder: "auto",
    proportionOfInvariableSites: "0",
    rateCategories: "",
    autoMerge: "yes",
    mergingAlgorithm: "rclusterf",
    stateFrequency: "none",
  },
  tree: {
    on: "no",
    numberOfUnsuccessfulIterationsToStop: "100",
    perturbationStrength: "0.5",
    constrainedTreeFile: "none",
    referenceTree: "",
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
