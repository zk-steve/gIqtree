module.exports.assessment_mapping = (object_model, inputs) => {
  let result = "";
  //Step 1: Bootstrap method
  if (object_model["assessment"]["bootstrapMethod"] !== "none") {
    if (object_model["assessment"]["bootstrapMethod"] === "ufboot") {
      result += " -B " + object_model["assessment"]["replicates"];
    } else if (object_model["assessment"]["bootstrapMethod"] === "standard") {
      result += " -b " + object_model["assessment"]["replicates"];
    }
  }
  //Step 2: UFBoot option for reducing impact of severe model violation
  if (
    object_model["assessment"]["bootstrapMethod"] === "ufboot" &&
    object_model["assessment"]["ufbootOption"] === "yes"
  ) {
    result += " --bnni";
  }
  //Step 3: Multi-partition sampling strategy
  if (
    inputs.length >= 1 &&
    object_model["assessment"]["bootstrapMethod"] !== "none"
  ) {
    result +=
      " --sampling " +
      object_model["assessment"][
        "multiPartitionSamplingStrategy"
      ].toUpperCase();
  }
  //Step 4: Single branch tests - pending
  //Step 5: Concordance factor
  if (object_model["assessment"]["concordanceFactor"]["gCF"] !== "") {
    result +=
      " --gcf " + object_model["assessment"]["concordanceFactor"]["gCF"];
  }
  if (object_model["assessment"]["concordanceFactor"]["sCF"] !== "") {
    result +=
      " --scf " + object_model["assessment"]["concordanceFactor"]["sCF"];
  }
  console.log({ assessment_mapping: result });
  return result;
};
