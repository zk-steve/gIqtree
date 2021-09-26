module.exports = {
  projectType: "findmodel",
  data: {
    alignment: "",
    partition: "",
    sequence: "autoDetect",
    codon: "codon1",
    partitionType: "separateGeneTrees",
  },
  model: {
    modelFinder: "auto",
    proportionOfInvariableSites: "no",
    rateCategories: "",
    rateCategoriesNumber: "4",
    autoMerge: "no",
    mergingAlgorithm: "",
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
