module.exports.dating_mapping = (object_model, inputs) => {
  let result = "";
  //Step 1: Available date info type
  if (object_model["dating"]["availableDateInfoType"] === "ancestral") {
    result += " --date-tip 0";
  }
  //Step 2: Date extraction from taxon names in alignment file
  if (object_model["dating"]["dateExtraction"] === "yes") {
    result += " --date TAXNAME";
  }
  //Step 3: Date file
  if (object_model["dating"]["dateFile"] !== "") {
    result += " --date " + `"${object_model["dating"]["dateFile"]}"`;
  }
  //Step 4: Branch containing outgroup
  if (
    object_model["dating"]["branchContainingOutgroup"] ===
    "Taxa_name_1, Taxa_name_2"
  ) {
    result += ` -o "Taxa_name_1,Taxa_name_2"`;
  }
  console.log({ dating_mapping: result });
  return result;
};
