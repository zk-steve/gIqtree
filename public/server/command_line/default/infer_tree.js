module.exports = {
    data: {
      alignment: "",
      partition: "",
      sequence: "autoDetect",
      codon: "codon1",
      partitionType: "edgeProportional",
    },
    model: {
      modelFinder: "",
      proportionOfInvariableSites: "0",
      rateCategories: "",
      autoMerge: "yes",
      mergingAlgorithm: "rclusterf",
    },
    tree: {
      on: "yes",
      numberOfUnsuccessfulIterationsToStop: "100",
      perturbationStrength: "0.5",
      constrainedTreeFile: "none",
      referenceTree: "",
    },
    assessment: {
      bootstrapMethod: "ufboot",
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