module.exports.data_mapping = (object_model, inputs) => {
  let result = "";
  // Alignment
  if (object_model["projectType"] !== "assessment" && object_model["data"]["alignment"].length >= 1) {
    if (Array.isArray(object_model["data"]["alignment"])) {
      result += " -s "
      object_model["data"]["alignment"].forEach(inputFile => {
        result += `"${inputFile}"`
        if (object_model["data"]["alignment"].indexOf(inputFile) !== object_model["data"]["alignment"].length - 1) {
          result += ","
        }
      })
    }
    else {
      switch (object_model["data"]["partitionType"]) {
        case "separateGeneTrees":
          // if (!isS) {
            result += " -S " + `"${object_model["data"]["alignment"]}"`;
          // }
          break;
        case "edgeProportional":
          result += " -p " + `"${object_model["data"]["alignment"]}"`;
          break;
        case "edgeEqual":
          result += " -q " + `"${object_model["data"]["alignment"]}"`;
          break;
        case "edgeUnlinked":
          result += " -Q " + `"${object_model["data"]["alignment"]}"`;
          break;
        default:
          result += " -s " + `"${object_model["data"]["alignment"]}"`;
          break;
      }
    }
  }
  // Partition file 
  // if (object_model["data"]["partition"].length >= 1 && object_model["projectType"] === "findmodel") {
  //   result += " -S " + object_model["data"]["partition"]
  // }
  // Parttion type
  if (inputs.length >= 1 && object_model["data"]["partition"].length !== 0) {
    switch (object_model["data"]["partitionType"]) {
      case "separateGeneTrees":
          result = result.replace("-S", "-s")
          result += " -S " + `"${object_model["data"]["partition"]}"`;
        break;
      case "edgeProportional":
        result = result.replace("-p", "-s")
        result += " -p " +`"${object_model["data"]["partition"]}"`;
        break;
      case "edgeEqual":
        result = result.replace("-q", "-s")
        result += " -q " + `"${object_model["data"]["partition"]}"`;
        break;
      case "edgeUnlinked":
        result = result.replace("-Q", "-s")
        result += " -Q " + `"${object_model["data"]["partition"]}"`;
        break;
      default:
        break;
    }
  }
  // Sequence type
  console.log(object_model["data"]["sequence"]);
  if (object_model["data"]["sequence"] !== "autoDetect") {
    if (object_model["data"]["sequence"].toUpperCase() === "CODON") {
      result += " --seqtype " + object_model["data"]["codon"].toUpperCase();
    }
    result += " --seqtype " + object_model["data"]["sequence"].toUpperCase();
  }
  console.log({ data_mapping: result });
  return result;
};
