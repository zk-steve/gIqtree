module.exports = {
    data: {
      alignment: "",
      partition: "",
      sequence: "autoDetect",
      codon: "codon1",
      partitionType: "separateGeneTrees",
    },
    model: {
      modelFinder: "",
      proportionOfInvariableSites: "0",
      rateCategories: "",
      autoMerge: "no",
      mergingAlgorithm: "",
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
  }