module.exports.other_mapping = (object_model, inputs, output_path) => {
  let result = "";
  //Step 1: Number of CPU cores
  if (object_model["others"]["numberOfCPUCores"] === "") {
    result += " -T AUTO";
  } else {
    if (typeof object_model["others"]["numberOfCPUCores"] === "number") {
      result += " -T " + object_model["others"]["numberOfCPUCores"];
    }
  }
  //Step 2: Prefix for all output files
  if (object_model["others"]["prefix"] === "") {
    result += " --prefix " + `"${output_path}"`;
  } else {
    result += " --prefix " + `"${object_model["others"]["prefix"]}"`;
  }
  //Step 3: Enter command-line - done
  if (object_model["others"]["enterCommandLine"] === "--redo") {
    result += " --redo";
  }
  console.log({ other_mapping: result });
  return result;
};
