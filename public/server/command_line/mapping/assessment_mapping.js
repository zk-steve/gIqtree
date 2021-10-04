module.exports.assessment_mapping = (object_model, inputs) => {
  let result = "";
  //Step 1: Bootstrap method - pending
  if (object_model["assessment"]["bootstrapMethod"] !== "none") {
    if (object_model["assessment"]["bootstrapMethod"] === "ufboot" && object_model["assessment"]["replicates"]) {
      result += " -B " + object_model["assessment"]["replicates"];
    } else if (object_model["assessment"]["bootstrapMethod"] === "standard" && object_model["assessment"]["replicates"]) {
      result += " -b " + object_model["assessment"]["replicates"];
    }
  }
  console.log("END STEP 1")
  //Step 2: UFBoot option for reducing impact of severe model violation
  if (
    object_model["assessment"]["bootstrapMethod"] === "ufboot" &&
    object_model["assessment"]["ufbootOption"] === "yes"
  ) {
    result += " --bnni";
  }console.log("END STEP 2")
  //Step 3: Multi-partition sampling strategy
  if (
    object_model["data"]["partition"].length !== 0 &&
    object_model["assessment"]["bootstrapMethod"] !== "none"
  ) {
    result +=
      " --sampling " +
      object_model["assessment"][
        "multiPartitionSamplingStrategy"
      ].toUpperCase();
  }
  //Step 4: Single branch tests - pending
  if (object_model["assessment"]["singleBranchTest"]["parametric"]) {
    result += " --alrt 0"
  }
  if (object_model["assessment"]["singleBranchTest"]["SHlike"] && typeof(object_model["assessment"]["singleBranchTest"]["SHlike"]) === "number") {
    result += " --alrt " + object_model["assessment"]["singleBranchTest"]["SHlike"]
  }
  if (object_model["assessment"]["singleBranchTest"]["aBayes"]) {
    result += " --abayes"
  }
  if (object_model["assessment"]["singleBranchTest"]["localBootstrap"] && typeof(object_model["assessment"]["singleBranchTest"]["localBootstrap"]) === "number") {
    result += " --lbp " + object_model["assessment"]["singleBranchTest"]["localBootstrap"]
  }
  console.log("END STEP 4")
  //Step 5: Concordance factor
  if (object_model["assessment"]["concordanceFactor"]["gCF"] !== "") {
    result +=
      " --gcf " + `"${object_model["assessment"]["concordanceFactor"]["gCF"]}`;
  }
  if (object_model["assessment"]["concordanceFactor"]["sCF"] !== "" && typeof(object_model["assessment"]["concordanceFactor"]["sCF"]) === "number") {
    result +=
      " --scf " + object_model["assessment"]["concordanceFactor"]["sCF"];
  }
  console.log("END STEP 5")
  console.log({ assessment_mapping: result });
  return result;
};
