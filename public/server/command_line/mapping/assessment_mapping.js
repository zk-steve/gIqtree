module.exports.assessment_mapping = (object_model, inputs) => {
  let result = "";
  //Step 1: Bootstrap method - pending
  if (object_model["assessment"]["bootstrapMethod"] !== "none") {
    if (
      object_model["assessment"]["bootstrapMethod"] === "ufboot" &&
      typeof parseInt(
        object_model["assessment"]["bootstrapMethodReplicate"]
      ) === "number"
    ) {
      result += " -B " + object_model["assessment"]["bootstrapMethodReplicate"];
    } else if (
      object_model["assessment"]["bootstrapMethod"] === "standard" &&
      typeof parseInt(
        object_model["assessment"]["bootstrapMethodReplicate"]
      ) === "number"
    ) {
      result += " -b " + object_model["assessment"]["bootstrapMethodReplicate"];
    }
  }
  console.log("END STEP 1");
  //Step 2: UFBoot option for reducing impact of severe model violation
  if (
    object_model["assessment"]["bootstrapMethod"] === "ufboot" &&
    object_model["assessment"]["ufbootOption"] === "yes"
  ) {
    result += " --bnni";
  }
  console.log("END STEP 2");
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
    result += " --alrt 0";
  }
  console.log({
    CCCCCCC:
      typeof object_model["assessment"]["singleBranchTest"]["SHlikeReplicate"],
  });
  if (
    object_model["assessment"]["singleBranchTest"]["SHlike"] &&
    object_model["assessment"]["singleBranchTest"]["SHlikeReplicate"] &&
    typeof parseInt(
      object_model["assessment"]["singleBranchTest"]["SHlikeReplicate"]
    ) === "number"
  ) {
    result +=
      " --alrt " +
      object_model["assessment"]["singleBranchTest"]["SHlikeReplicate"];
  }
  if (object_model["assessment"]["singleBranchTest"]["aBayes"]) {
    result += " --abayes";
  }
  if (
    object_model["assessment"]["singleBranchTest"]["localBootstrap"] &&
    object_model["assessment"]["singleBranchTest"]["localBootstrapReplicate"] &&
    typeof parseInt(
      object_model["assessment"]["singleBranchTest"]["localBootstrapReplicate"]
    ) === "number"
  ) {
    result +=
      " --lbp " +
      object_model["assessment"]["singleBranchTest"]["localBootstrapReplicate"];
  }
  console.log("END STEP 4");
  //Step 5: Concordance factor
  if (object_model["assessment"]["concordanceFactor"]["gCF"] !== "") {
    result +=
      " --gcf " + `"${object_model["assessment"]["concordanceFactor"]["gCF"]}`;
  }
  if (
    object_model["assessment"]["concordanceFactor"]["sCF"] !== "" &&
    object_model["assessment"]["concordanceFactor"]["sCF"] &&
    typeof parseInt(object_model["assessment"]["concordanceFactor"]["sCF"]) ===
      "number"
  ) {
    result +=
      " --scf " + object_model["assessment"]["concordanceFactor"]["sCF"];
  }
  console.log("END STEP 5");
  console.log({ assessment_mapping: result });
  return result;
};
