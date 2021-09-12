module.exports.data_mapping = (object_model, inputs) => {
  let result = "";
  // Alignment
  if (object_model["projectType"] !== "assessment") {
    result += " -s";
    inputs.forEach((input) => {
      result += " " + input;
    });
  }
  // Partition file  - done
  // Sequence type
  console.log(object_model["data"]["sequence"]);
  if (object_model["data"]["sequence"] !== "autoDetect") {
    if (object_model["data"]["sequence"].toUpperCase() === "CODON") {
      result += " --seqtype " + object_model["data"]["codon"].toUpperCase();
    }
    result += " --seqtype " + object_model["data"]["sequence"].toUpperCase();
  }
  // Parttion type
  if (inputs.length >= 1 && object_model["data"]["partition"].length !== 0) {
    switch (object_model["data"]["partitionType"]) {
      case "separateGeneTrees":
        result += " -S " + object_model["data"]["partition"];
        break;
      case "edgeProportional":
        result += " -p " + object_model["data"]["partition"];
        break;
      case "edgeEqual":
        result += " -q " + object_model["data"]["partition"];
        break;
      case "edgeUnlinked":
        result += " -Q " + object_model["data"]["partition"];
        break;
      default:
        break;
    }
  }
  console.log({ data_mapping: result });
  return result;
};
