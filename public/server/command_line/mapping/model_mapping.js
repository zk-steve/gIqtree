module.exports.model_mapping = (object_model, inputs) => {
  let result = "";
  //Step 1: Substitution model
  let default_flag = false;
  if (object_model["model"]["modelFinder"] === "") {
    default_flag = true;
    result += " -m MFP";
  } else {
    result += " -m " + object_model["model"]["modelFinder"];
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
      object_model["model"]["proportionOfInvariableSites"] !== "0" ||
      object_model["model"]["proportionOfInvariableSites"] !== ""
    ) {
      result += "+I";
    }
    if (object_model["model"]["rateCategories"] === "Gamma") {
      result += "+G";
    } else if (object_model["model"]["rateCategories"] === "FreeRate") {
      result += "+R ";
    }
  }
  //Step 3: State frequency -pending
  //Step 4: Ascertainment bias correction
  if (!default_flag) {
    result += "+ASC";
  }
  //Step 5: Auto-merge partitions
  //Step 6: Merging algorithm
  if (inputs.length >= 1) {
    object_model["model"]["autoMerge"] === "yes"
      ? (result +=
          " --merge " + object_model["model"]["mergingAlgorithm"].toLowerCase())
      : (result = result + "");
  }
  console.log({ model_mapping: result });
  return result;
};
