const fs = require("fs")
module.exports.model_mapping = (object_model) => {
  let result = "";
  //Step 1: Substitution model
  let default_flag = false;
  if (object_model["model"]["rateCategories"] === "Gamma") {
    result += " -m TEST"
  }
  else {
    if (object_model["model"]["modelFinder"] === "auto") {
      default_flag = true;
      result += " -m MFP";
    }
    else {
      result += " -m " + object_model["model"]["modelFinder"];
    }
  }
  if (object_model["tree"]["on"] === "no") {
    result += " -n 0";
  }
  // switch (object_model["model"]["modelFinder"]) {
  //   case "LC or JC69":
  //     result += " -m 000000";
  //     break;
  //   case "F81":
  //     result += " -m 000000";
  //     break;
  //   case "K80 or K2P":
  //     result += " -m 010010";
  //     break;
  //   case "HKY or HKY85":
  //     result += " -m 010010";
  //     break;
  //   case "TN or TN93":
  //     result += " -m 010020";
  //     break;
  //   case "TNe":
  //     result += " -m 010020";
  //     break;
  //   case "K81 or K3P":
  //     result += " -m 012210";
  //     break;
  //   case "K81u":
  //     result += " -m 012210";
  //     break;
  //   case "TPM2":
  //     result += " -m 010212";
  //     break;
  //   case "TPM2u":
  //     result += " -m 010212";
  //     break;
  //   case "TPM3":
  //     result += " -m 012012";
  //     break;
  //   case "TIM":
  //     result += " -m 012230";
  //     break;
  //   case "TIMe":
  //     result += " -m 012230";
  //     break;
  //   case "TIM2":
  //     result += " -m 010232";
  //     break;
  //   case "TIM2e":
  //     result += " -m 010232";
  //     break;
  //   case "TIM3":
  //     result += " -m 012032";
  //     break;
  //   case "TIM3e":
  //     result += " -m 012032";
  //     break;
  //   case "TVM":
  //     result += " -m 012314";
  //     break;
  //   case "TVMe":
  //     result += " -m 012314";
  //     break;
  //   case "SYM":
  //     result += " -m 012345";
  //     break;
  //   case "GTR":
  //     result += " -m 012345";
  //     break;
  //   default:
  //     default_flag = true;
  //     result += " -m MFP";
  //     break;
  // }
  //Step 2: Rate heterogeneity across sites
  if (!default_flag) {
    if (
      object_model["model"]["proportionOfInvariableSites"] !== "no" ||
      object_model["model"]["proportionOfInvariableSites"] !== ""
    ) {
      result += "+I";
    }
    if (object_model["model"]["rateCategories"] === "Gamma") {
      result += "+G";
      object_model["model"]["rateCategories"]
        ? result += object_model["model"]["rateCategoriesNumber"]
        : result += "4"
    } else if (object_model["model"]["rateCategories"] === "FreeRate") {
      result += "+R ";
      object_model["model"]["rateCategories"]
        ? result += object_model["model"]["rateCategoriesNumber"]
        : result += "4"
    }
  }
  //Step 3: State frequency
  if (!default_flag && object_model["model"]["stateFrequency"] !== "none") {
    if (object_model["data"]["codon"] !== "") {
      result += "F1x4"
    }
    else {
      result += object_model["model"]["stateFrequency"]
    }
  }
  //Step 4: Ascertainment bias correction
  if (!default_flag) {
    if (object_model["data"]["sequence"] === "DNA" || object_model["data"]["sequence"] === "MORPH") {
      result += "+ASC"
    }
  }
  //Step 5: Auto-merge partitions
  //Step 6: Merging algorithm
  if ((object_model["data"]["alignment"].length >= 2 || fs.lstatSync(object_model["data"]["alignment"]).isDirectory()) && object_model["data"]["partition"].length !== 0) {
    object_model["model"]["autoMerge"] === "yes"
      ? (result +=
          " --merge " + object_model["model"]["mergingAlgorithm"].toLowerCase())
      : (result = result + "");
  }
  console.log({ model_mapping: result });
  return result;
};