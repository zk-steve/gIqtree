const fs = require("fs")
const path = require("path")
module.exports.data_mapping = (object_model) => {
  let result = "";
  // Alignment
  console.log("step 1")
  if (((object_model["data"]["alignment"].length >= 1 && typeof(object_model["data"]["alignment"]) === "string") || Array.isArray(object_model["data"]["alignment"]))) {
    console.log("IN FILEE")
    if (Array.isArray(object_model["data"]["alignment"])) {
      console.log("ARRAYYYYYYYYYYYY ALIGNMENT")
      object_model["data"]["alignment"] = object_model["data"]["alignment"].join(",")
      result += " -s " + `"${object_model["data"]["alignment"]}"`
      // console.log({result})
    }
    else if (fs.lstatSync(object_model["data"]["alignment"]).isDirectory()) {
      console.log("FOLDERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR")
      result += " -s "
      const files = fs.readdirSync(object_model["data"]["alignment"]);
      if (Array.isArray(files)) {
        files.forEach(file => {
          const filePath = path.join(object_model["data"]["alignment"], file)
          result += `"${filePath}"`
          if (files.indexOf(file) !== files.length - 1) {
            result += ","
          }
        })
      }
    }
    else {
      console.log("FILEEEEEEEEEE")
      result += " -s " + `"${object_model["data"]["alignment"]}"`
    }
  }
  // Partition file 
  // if (object_model["data"]["partition"].length >= 1 && object_model["projectType"] === "findmodel") {
  //   result += " -S " + object_model["data"]["partition"]
  // }
  // Parttion type
  console.log("step 2")
  if (fs.lstatSync(object_model["data"]["alignment"]).isDirectory()) {
    console.log("step 2.1")
    switch (object_model["data"]["partitionType"]) {
      case "separateGeneTrees":
          result = result.replace("-s", "-S")
        break;
      case "edgeProportional":
        result = result.replace("-s", "-p")
        break;
      case "edgeEqual":
        result = result.replace("-s", "-q")
        break;
      case "edgeUnlinked":
        result = result.replace("-s", "-Q")
        break;
      default:
        break;
    }
  }
  else if (object_model["data"]["partition"].length !== 0) {
    console.log("step 2.2")
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
  console.log("step 3")
  if (object_model["data"]["sequence"] !== "autoDetect") {
    if (object_model["data"]["sequence"].toUpperCase() === "CODON") {
      result += " --seqtype " + object_model["data"]["codon"].toUpperCase();
    }
    result += " --seqtype " + object_model["data"]["sequence"].toUpperCase();
  }
  console.log({ data_mapping: result });
  return result;
};
