module.exports.tree_search_mapping = (object_model, inputs) => {
  let result = "";
  //Step 1: On
  if (!object_model["tree"]["on"]) {
    result += " -n 0";
  }
  //Step 2: Number of unsuccessful iterations to stop
  if (
    object_model["tree"]["numberOfUnsuccessfulIterationsToStop"] !== "100" &&
    object_model["tree"]["numberOfUnsuccessfulIterationsToStop"] !== "" && typeof(object_model["tree"]["numberOfUnsuccessfulIterationsToStop"]) === "number"
  ) {
    result +=
      " --nstop " +
      object_model["tree"]["numberOfUnsuccessfulIterationsToStop"];
  }
  //Step 3: Perturbation strength (between 0 and 1) for randomized NNI
  if (
    object_model["tree"]["perturbationStrength"] !== "0.5" &&
    object_model["tree"]["perturbationStrength"] !== "" && typeof(object_model["tree"]["perturbationStrength"]) === "number"
  ) {
    result += " --perturb " + object_model["tree"]["perturbationStrength"];
  }
  //Step 4: Constrained tree file
  if (object_model["tree"]["constrainedTreeFile"] !== "" && object_model["tree"]["constrainedTreeFile"] !== "none") {
    result += " -g " + object_model["tree"]["constrainedTreeFile"];
  }
  //Step 5: Reference tree
  if (object_model["tree"]["referenceTree"] !== "") {
    result += " -te " + object_model["tree"]["referenceTree"];
  }
  console.log({ tree_search_mapping: result });
  return result;
};
