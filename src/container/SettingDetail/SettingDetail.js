import {
  Divider,
  Typography,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import clsx from "clsx";
import SettingMenu from "component/SettingMenu/SettingMenu";
import React, { useState, useEffect } from "react";
import { Directory } from "shared/icons";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");

function SettingDetail({ handleCloseSetting, multiPartition, projectSetting }) {
  const classes = useStyles();
  const [settingField, setSettingField] = useState({ ...projectSetting });
  const [currentOption, setCurrentOption] = useState("data");
  useEffect(() => {
    console.log(settingField);
  }, [settingField]);
  const settingDetail = {
    data: {
      textInput: [
        {
          title: "Alignment file(s)/folder:",
          id: "alignment",
          value: "",
        },
        { title: "Partition file:", id: "partition", value: "" },
      ],
      sequenceType: [
        {
          label: "Auto-detect",
          value: "autoDetect",
          id: "autoDetect",
          name: "sequence",
        },
        { label: "DNA", value: "DNA", id: "dna", name: "sequence" },
        { label: "Protein", value: "AA", id: "protein", name: "sequence" },
        { label: "Codon", value: "CODON", id: "codon", name: "sequence" },
        { label: "Binary", value: "BIN", id: "binary", name: "sequence" },
        {
          label: "Morphology",
          value: "MORPH",
          id: "morphology",
          name: "sequence",
        },
        {
          label: "DNA-to-AA-translated sequences",
          value: "NT2AA",
          id: "dnatoaa",
          name: "sequence",
        },
      ],
      codonList: [
        {
          label: "CODON1 - The Standard Code (same as -st CODON)",
          value: "codon1",
          id: "codon1",
          name: "codon",
        },
        {
          label: "CODON2 - The Vertebrate Mitochondrial Code",
          value: "codon2",
          id: "codon2",
          name: "codon",
        },
        {
          label: "CODON3 - The Yeast Mitochondrial Code",
          value: "codon3",
          id: "codon3",
          name: "codon",
        },
        {
          label:
            "CODON4 - The Mold, Protozoan, and Coelenterate Mitochondrial Code and the Mycoplasma/Spiroplasma Code",
          value: "codon4",
          id: "codon4",
          name: "codon",
        },
        {
          label: "CODON5 - The Invertebrate Mitochondrial Code",
          value: "codon5",
          id: "codon5",
          name: "codon",
        },
        {
          label:
            "CODON6 - The Ciliate, Dasycladacean and Hexamita Nuclear Code",
          value: "codon6",
          id: "codon6",
          name: "codon",
        },
        {
          label: "CODON9 - The Echinoderm and Flatworm Mitochondrial Code",
          value: "codon9",
          id: "codon9",
          name: "codon",
        },
        {
          label: "CODON10 - The Euplotid Nuclear Code",
          value: "codon10",
          id: "codon10",
          name: "codon",
        },
        {
          label: "CODON11 - The Bacterial, Archaeal and Plant Plastid Code",
          value: "codon11",
          id: "codon11",
          name: "codon",
        },
        {
          label: "CODON12 - The Alternative Yeast Nuclear Code",
          value: "codon12",
          id: "codon12",
          name: "codon",
        },
        {
          label: "CODON13 - The Ascidian Mitochondrial Code",
          value: "codon13",
          id: "codon13",
          name: "codon",
        },
        {
          label: "CODON14 - The Alternative Flatworm Mitochondrial Code",
          value: "codon14",
          id: "codon14",
          name: "codon",
        },
        {
          label: "CODON16 - Chlorophycean Mitochondrial Code",
          value: "codon16",
          id: "codon16",
          name: "codon",
        },
        {
          label: "CODON21 - Trematode Mitochondrial Code",
          value: "codon21",
          id: "codon21",
          name: "codon",
        },
        {
          label: "CODON22 - Scenedesmus obliquus Mitochondrial Code",
          value: "codon22",
          id: "codon22",
          name: "codon",
        },
        {
          label: "CODON23 - Thraustochytrium Mitochondrial Code",
          value: "codon23",
          id: "codon23",
          name: "codon",
        },
        {
          label: "CODON24 - Pterobranchia Mitochondrial Code",
          value: "codon24",
          id: "codon24",
          name: "codon",
        },
        {
          label: "CODON25 - Candidate Division SR1 and Gracilibacteria Code",
          value: "codon25",
          id: "codon25",
          name: "codon",
        },
      ],
    },
    model: {
      substitutionModel: [
        {
          label: "Model Finder",
          value: "modelFinder",
          id: "modelFinder",
          name: "modelFinder",
        },
      ],
      modelFinder: [
        {
          label: "LC or JC69",
          value: "LC or JC69",
          id: "jLC or JC69",
          name: "modelFinderList",
          df: 0,
          explanation: "Equal substitution rates and equal base frequencies",
        },
        {
          label: "F81",
          value: "F81",
          id: "F81",
          name: "modelFinderList",
          df: 3,
          explanation: "Equal rates but unequal base freq",
        },
        {
          label: "K80 or K2P",
          value: "K80 or K2P",
          id: "K80 or K2P",
          name: "modelFinderList",
          df: 1,
          explanation:
            "Unequal transition/transversion rates and equal base freq",
        },
        {
          label: "HKY or HKY85",
          value: "HKY or HKY85",
          id: "HKY or HKY85",
          name: "modelFinderList",
          df: 4,
          explanation:
            "Unequal transition/transversion rates and unequal base freqfreq",
        },
        {
          label: "TN or TN93",
          value: "TN or TN93",
          id: "TN or TN93",
          name: "modelFinderList",
          df: 5,
          explanation: "Like HKY but unequal purine/pyrimidine rates",
        },
        {
          label: "TN or TN93",
          value: "TN or TN93",
          id: "TN or TN93",
          name: "modelFinderList",
          df: 5,
          explanation: "Like HKY but unequal purine/pyrimidine rates",
        },
        {
          label: "TNe",
          value: "TNe",
          id: "TNe",
          name: "modelFinderList",
          df: 2,
          explanation: "Like TN but equal base freq.",
        },
        {
          label: "K81 or K3P",
          value: "K81 or K3P",
          id: "K81 or K3P",
          name: "modelFinderList",
          df: 2,
          explanation: "Three substitution types model and equal base freq.",
        },
        {
          label: "K81u",
          value: "K81u",
          id: "K81u",
          name: "modelFinderList",
          df: 5,
          explanation: "Like K81 but unequal base freq.",
        },
        {
          label: "TPM2",
          value: "TPM2",
          id: "TPM2",
          name: "modelFinderList",
          df: 2,
          explanation: "AC=AT, AG=CT, CG=GT and equal base freq.",
        },
        {
          label: "TPM2u",
          value: "TPM2u",
          id: "TPM2u",
          name: "modelFinderList",
          df: 5,
          explanation: "Like TPM2 but unequal base freq.",
        },
        {
          label: "TPM3",
          value: "TPM3",
          id: "TPM3",
          name: "modelFinderList",
          df: 2,
          explanation: "AC=CG, AG=CT, AT=GT and equal base freq.",
        },
        {
          label: "TPM3u",
          value: "TPM3u",
          id: "TPM3u",
          name: "modelFinderList",
          df: 5,
          explanation: "Like TPM3 but unequal base freq.",
        },
        {
          label: "TIM",
          value: "TIM",
          id: "TIM",
          name: "modelFinderList",
          df: 6,
          explanation: "Transition model, AC=GT, AT=CG and unequal base freq.",
        },
        {
          label: "TIMe",
          value: "TIMe",
          id: "TIMe",
          name: "modelFinderList",
          df: 3,
          explanation: "Like TIM but equal base freq.",
        },
        {
          label: "TIM2",
          value: "TIM2",
          id: "TIM2",
          name: "modelFinderList",
          df: 6,
          explanation: "AC=AT, CG=GT and unequal",
        },
        {
          label: "TIM2e",
          value: "TIM2e",
          id: "TIM2e",
          name: "modelFinderList",
          df: 3,
          explanation: "Like TIM2 but equal base freq.",
        },
        {
          label: "TIM3",
          value: "TIM3",
          id: "TIM3",
          name: "modelFinderList",
          df: 6,
          explanation: "AC=CG, AT=GT and unequal base freq.",
        },
        {
          label: "TIM3e",
          value: "TIM3e",
          id: "TIM3e",
          name: "modelFinderList",
          df: 3,
          explanation: "Like TIM3 but equal base freq.",
        },
        {
          label: "TVM",
          value: "TVM",
          id: "TVM",
          name: "modelFinderList",
          df: 7,
          explanation: "Transversion model, AG=CT and unequal base freq.",
        },
        {
          label: "TVMe",
          value: "TVMe",
          id: "TVMe",
          name: "modelFinderList",
          df: 4,
          explanation: "Like TVM but equal base freq.",
        },
        {
          label: "SYM",
          value: "SYM",
          id: "SYM",
          name: "modelFinderList",
          df: 5,
          explanation:
            "Symmetric model with unequal rates but equal base freq.",
        },
        {
          label: "GTR",
          value: "GTR",
          id: "GTR",
          name: "modelFinderList",
          df: 8,
          explanation:
            "General time reversible model with unequal rates and unequal base freq.",
        },
      ],
      rateCategories: [
        { label: "Gamma", value: "Gamma", id: "gamma" },
        { label: "FreeRate", value: "FreeRate", id: "freeRate" },
      ],
      stateFrequency: [
        {
          label: "Empirical state frequencies from the data: +F",
        },
        {
          label: "ML optimized state frequencies from the data: +FO",
        },
        {
          label: multiPartition
            ? "Equal state frequencies: +FQ, +F1x4, +F3x4"
            : "Equal state frequencies: +FQ",
        },
      ],
    },
  };
  const { data, model } = settingDetail;
  const handleSelectNavigatorOption = (option) => {
    if (option !== currentOption) setCurrentOption(option);
  };
  const handleChangeDataSetting = (e, property) => {
    setSettingField({
      ...settingField,
      data: {
        ...settingField.data,
        [property]: e.target.value,
      },
    });
  };
  const handleChangeModelSetting = (e, property) => {
    setSettingField({
      ...settingField,
      model: {
        ...settingField.model,
        [property]: e.target.value,
      },
    });
  };
  const handleChangeTreeSetting = (e, property) => {
    setSettingField({
      ...settingField,
      tree: {
        ...settingField.tree,
        [property]: e.target.value,
      },
    });
  };
  const handleChangeAssessmentSetting = (e, property) => {
    setSettingField({
      ...settingField,
      assessment: {
        ...settingField.assessment,
        [property]: e.target.value,
      },
    });
  };
  const handleChangeDatingSetting = (e, property) => {
    setSettingField({
      ...settingField,
      dating: {
        ...settingField.dating,
        [property]: e.target.value,
      },
    });
  };
  const handleChangeOthersSetting = (e, property) => {
    setSettingField({
      ...settingField,
      others: {
        ...settingField.others,
        [property]: e.target.value,
      },
    });
  };
  const handleChangeAssessmentMultiple = (e, property, subProperty) => {
    setSettingField({
      ...settingField,
      assessment: {
        ...settingField.assessment,
        [property]: {
          ...settingField.assessment[property],
          [subProperty]:
            e.type === "checkbox" ? e.target.checked : e.target.value,
        },
      },
    });
  };
  const handleSaveSetting = () => {
    console.log(settingField);
    ipcRenderer.invoke("saveSetting", settingField);
  };
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <SettingMenu
          currentOption={currentOption}
          handleSelectNavigatorOption={handleSelectNavigatorOption}
          handleCloseSetting={handleCloseSetting}
        />
        <Divider variant="fullWidth" orientation="vertical" />
        <div className={classes.settingOverflow}>
          {currentOption === "data" && (
            <form className={classes.settingDetail}>
              <Typography className={classes.settingDetailTitle}>
                Data
              </Typography>
              <div className={classes.textInputContainer}>
                <InputLabel htmlFor="alignment" className={classes.inputLabel}>
                  Alignment file(s) and folder
                </InputLabel>
                <OutlinedInput
                  id="alignment"
                  className={classes.textInput}
                  value={settingField.data.alignment}
                  onChange={(e) => handleChangeDataSetting(e, "alignment")}
                  startAdornment={<Directory />}
                />
              </div>
              {multiPartition && (
                <div className={classes.textInputContainer}>
                  <InputLabel
                    htmlFor="partition"
                    className={classes.inputLabel}
                  >
                    Partition file
                  </InputLabel>
                  <OutlinedInput
                    id="partition"
                    className={classes.textInput}
                    value={settingField.data.partition}
                    onChange={(e) => handleChangeDataSetting(e, "partition")}
                    startAdornment={<Directory />}
                  />
                </div>
              )}
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Sequence type
                </Typography>
                <div className={classes.dataRadioContainer}>
                  {data.sequenceType.map((input, index) => (
                    <div className={classes.radioInput} key={index}>
                      <input
                        type="radio"
                        name={input.name}
                        id={input.id}
                        value={input.value}
                        checked={input.value === settingField.data.sequence}
                        onChange={(e) => handleChangeDataSetting(e, "sequence")}
                      />
                      <InputLabel
                        htmlFor={input.id}
                        className={classes.radioLabel}
                      >
                        {input.label}
                      </InputLabel>
                    </div>
                  ))}
                </div>
                {settingField.data.sequence === "CODON" && (
                  <div className={classes.codonList}>
                    {data.codonList.map((input, index) => (
                      <div className={classes.radioInput} key={index}>
                        <input
                          type="radio"
                          name={input.name}
                          id={input.id}
                          value={input.value}
                          checked={input.value === settingField.data.codon}
                          onChange={(e) => handleChangeDataSetting(e, "codon")}
                        />
                        <InputLabel
                          htmlFor={input.id}
                          className={clsx(
                            classes.radioLabel,
                            classes.fontSmall
                          )}
                        >
                          {input.label}
                        </InputLabel>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {multiPartition && (
                <div className={classes.textInputContainer}>
                  <InputLabel
                    htmlFor="partitionType"
                    className={classes.inputLabel}
                  >
                    Partition type
                  </InputLabel>
                  <Select
                    id="partitionType"
                    variant="outlined"
                    className={classes.textInput}
                    value={settingField.data.partitionType}
                    onChange={(e) =>
                      handleChangeDataSetting(e, "partitionType")
                    }
                  >
                    <MenuItem value="separateGeneTrees">
                      Separate-gene-tree
                    </MenuItem>
                    <MenuItem value="edgeProportional">
                      Edge-proportional
                    </MenuItem>
                    <MenuItem value="edgeEqual">Edge-equal</MenuItem>
                    <MenuItem value="edgeUnlinked">Edge-unlinked</MenuItem>
                  </Select>
                </div>
              )}
            </form>
          )}
          {currentOption === "model" && (
            <form className={classes.settingDetail}>
              <Typography className={classes.settingDetailTitle}>
                Model
              </Typography>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Substitution model
                </Typography>
                <div className={classes.dataRadioContainer}>
                  {model.substitutionModel.map((input, index) => (
                    <div className={classes.radioInput} key={index}>
                      <input
                        type="radio"
                        name={input.name}
                        id={input.id}
                        value={input.value}
                        checked
                      />
                      <InputLabel
                        htmlFor={input.id}
                        className={classes.radioLabel}
                      >
                        {input.label}
                      </InputLabel>
                    </div>
                  ))}
                </div>
                <div className={clsx(classes.codonList, classes.modelTable)}>
                  <div
                    className={clsx(
                      classes.modelFinderHead,
                      classes.modelTableHead
                    )}
                  >
                    <Typography id="model">Model</Typography>
                    <Typography id="df">df</Typography>
                    <Typography id="explanation">Explanation</Typography>
                  </div>
                  <div className={clsx(classes.listModel)}>
                    {model.modelFinder.map((input, index) => (
                      <div className={classes.radioInput} key={index}>
                        <input
                          type="radio"
                          name={input.name}
                          id={input.id}
                          value={input.value}
                          checked={
                            input.value === settingField.model.modelFinder
                          }
                          onChange={(e) =>
                            handleChangeModelSetting(e, "modelFinder")
                          }
                        />
                        <InputLabel
                          htmlFor={input.id}
                          className={clsx(
                            classes.radioLabel,
                            classes.modelMargin,
                            classes.fontSmall
                          )}
                        >
                          {input.label}
                        </InputLabel>
                        <InputLabel
                          htmlFor={input.id}
                          className={clsx(
                            classes.radioLabel,
                            classes.df,
                            classes.fontSmall
                          )}
                        >
                          {input.df}
                        </InputLabel>
                        <InputLabel
                          htmlFor={input.id}
                          className={clsx(
                            classes.radioLabel,
                            classes.expl,
                            classes.fontSmall
                          )}
                        >
                          {input.explanation}
                        </InputLabel>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={classes.textInputContainer}>
                  <Typography className={classes.inputLabel}>
                    Rate heterogeneity across sites:
                  </Typography>
                  <div className={classes.shortPath}>
                    <Typography align="left">
                      Proportion of invariable sites
                    </Typography>
                    <OutlinedInput
                      className={classes.shortTextInput}
                      value={settingField.model.proportionOfInvariableSites}
                      onChange={(e) => {
                        handleChangeModelSetting(
                          e,
                          "proportionOfInvariableSites"
                        );
                      }}
                    />
                  </div>
                  <div
                    className={clsx(classes.shortPath, classes.selectMargin)}
                  >
                    <Typography align="left">Rate categories</Typography>
                    <Select
                      variant="outlined"
                      className={classes.shortTextInput}
                      value={settingField.model.rateCategories}
                      onChange={(e) =>
                        handleChangeModelSetting(e, "rateCategories")
                      }
                    >
                      {model.rateCategories.map((input, index) => (
                        <MenuItem value={input.value}>{input.label}</MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className={classes.textInputContainer}>
                  <Typography className={classes.inputLabel}>
                    State frequency
                  </Typography>
                  {model.stateFrequency.map((input, index) => (
                    <div
                      className={clsx(classes.radioInput, classes.selectMargin)}
                      key={index}
                    >
                      <InputLabel
                        className={clsx(classes.radioLabel, classes.expl)}
                      >
                        {input.label}
                      </InputLabel>
                    </div>
                  ))}
                </div>
                <div className={classes.textInputContainer}>
                  <Typography className={classes.inputLabel}>
                    Ascertainment bias correction
                  </Typography>
                  <OutlinedInput
                    className={classes.shortTextInput}
                    defaultValue="+ASC"
                    placeholder="+ASC"
                    disabled
                  ></OutlinedInput>
                </div>
                {multiPartition && (
                  <div className={classes.textInputContainer}>
                    <Typography className={classes.inputLabel}>
                      Auto-merge partitions
                    </Typography>
                    <div className={classes.twoOption}>
                      <div
                        className={clsx(
                          classes.radioInput,
                          classes.selectMargin
                        )}
                      >
                        <input
                          type="radio"
                          name="autoMerge"
                          id="yes"
                          value="yes"
                          checked={settingField.model.autoMerge === "yes"}
                          onChange={(e) =>
                            handleChangeModelSetting(e, "autoMerge")
                          }
                        />
                        <InputLabel
                          htmlFor="yes"
                          className={classes.radioLabel}
                        >
                          Yes
                        </InputLabel>
                      </div>
                      <div
                        className={clsx(
                          classes.radioInput,
                          classes.selectMargin
                        )}
                      >
                        <input
                          type="radio"
                          name="autoMerge"
                          id="no"
                          value="no"
                          checked={settingField.model.autoMerge === "no"}
                          onChange={(e) =>
                            handleChangeModelSetting(e, "autoMerge")
                          }
                        />
                        <InputLabel htmlFor="no" className={classes.radioLabel}>
                          No
                        </InputLabel>
                      </div>
                    </div>
                  </div>
                )}
                {multiPartition && (
                  <div className={classes.textInputContainer}>
                    <Typography className={classes.inputLabel}>
                      Merging algorithm
                    </Typography>
                    <div
                      className={clsx(classes.radioInput, classes.selectMargin)}
                    >
                      <input
                        type="radio"
                        name="mergeAlgorithm"
                        id="greedy"
                        value="greedy"
                        checked={
                          settingField.model.mergingAlgorithm === "greedy"
                        }
                        onChange={(e) =>
                          handleChangeModelSetting(e, "mergingAlgorithm")
                        }
                      />
                      <InputLabel
                        htmlFor="greedy"
                        className={classes.radioLabel}
                      >
                        Greedy
                      </InputLabel>
                    </div>
                    <div
                      className={clsx(classes.radioInput, classes.selectMargin)}
                    >
                      <input
                        type="radio"
                        name="mergeAlgorithm"
                        id="rcluster"
                        value="rcluster"
                        checked={
                          settingField.model.mergingAlgorithm === "rcluster"
                        }
                        onChange={(e) =>
                          handleChangeModelSetting(e, "mergingAlgorithm")
                        }
                      />
                      <InputLabel
                        htmlFor="rcluster"
                        className={classes.radioLabel}
                      >
                        RCluster
                      </InputLabel>
                    </div>
                    <div
                      className={clsx(classes.radioInput, classes.selectMargin)}
                    >
                      <input
                        type="radio"
                        name="mergeAlgorithm"
                        id="rclusterf"
                        value="rclusterf"
                        checked={
                          settingField.model.mergingAlgorithm === "rclusterf"
                        }
                        onChange={(e) =>
                          handleChangeModelSetting(e, "mergingAlgorithm")
                        }
                      />
                      <InputLabel
                        htmlFor="rclusterf"
                        className={classes.radioLabel}
                      >
                        RClusterf
                      </InputLabel>
                    </div>
                  </div>
                )}
              </div>
            </form>
          )}
          {currentOption === "tree" && (
            <form className={classes.settingDetail}>
              <Typography className={classes.settingDetailTitle}>
                Tree search
              </Typography>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>On</Typography>
                <div className={classes.twoOption}>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="radio"
                      name="on"
                      id="yes"
                      value="yes"
                      checked={settingField.tree.on === "yes"}
                      onChange={(e) => handleChangeTreeSetting(e, "on")}
                    />
                    <InputLabel htmlFor="yes" className={classes.radioLabel}>
                      Yes
                    </InputLabel>
                  </div>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="radio"
                      name="on"
                      id="no"
                      value="no"
                      checked={settingField.tree.on === "no"}
                      onChange={(e) => handleChangeTreeSetting(e, "on")}
                    />
                    <InputLabel htmlFor="no" className={classes.radioLabel}>
                      No
                    </InputLabel>
                  </div>
                </div>
              </div>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Number of unsuccesful iterations to stop:
                </Typography>
                <OutlinedInput
                  type="number"
                  className={classes.shortTextInput}
                  value={settingField.tree.numberOfUnsuccessfulIterationsToStop}
                  onChange={(e) =>
                    handleChangeTreeSetting(
                      e,
                      "numberOfUnsuccessfulIterationsToStop"
                    )
                  }
                />
              </div>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Perturbation strength (between 0 and 1) for randomized NNI:
                </Typography>
                <OutlinedInput
                  type="number"
                  className={classes.shortTextInput}
                  value={settingField.tree.perturbationStrength}
                  onChange={(e) =>
                    handleChangeTreeSetting(e, "perturbationStrength")
                  }
                />
              </div>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Constrained tree file
                </Typography>
                <OutlinedInput
                  className={classes.textInput}
                  value={settingField.tree.constrainedTreeFile}
                  onChange={(e) =>
                    handleChangeTreeSetting(e, "constrainedTreeFile")
                  }
                  startAdornment={<Directory />}
                />
              </div>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Reference tree
                </Typography>
                <OutlinedInput
                  className={classes.textInput}
                  value={settingField.tree.referenceTree}
                  onChange={(e) => handleChangeTreeSetting(e, "referenceTree")}
                  startAdornment={<Directory />}
                />
              </div>
            </form>
          )}
          {currentOption === "assessment" && (
            <form className={classes.settingDetail}>
              <Typography className={classes.settingDetailTitle}>
                Assessment
              </Typography>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Boostrap method:
                </Typography>
                <Select
                  className={classes.shortTextInput}
                  variant="outlined"
                  value={settingField.assessment.bootstrapMethod}
                  onChange={(e) =>
                    handleChangeAssessmentSetting(e, "bootstrapMethod")
                  }
                >
                  <MenuItem value="ufboot">UFBoot </MenuItem>
                  <MenuItem value="standard">Standard</MenuItem>
                  <MenuItem value="none">None</MenuItem>
                </Select>
              </div>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  UFBoot option for reducing impact of severe model violation
                </Typography>
                <div className={classes.twoOption}>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="radio"
                      name="ufboot"
                      id="yes"
                      value="yes"
                      checked={settingField.assessment.ufbootOption === "yes"}
                      onChange={(e) =>
                        handleChangeAssessmentSetting(e, "ufbootOption")
                      }
                    />
                    <InputLabel htmlFor="yes" className={classes.radioLabel}>
                      Yes
                    </InputLabel>
                  </div>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="radio"
                      name="ufboot"
                      id="no"
                      value="no"
                      checked={settingField.assessment.ufbootOption === "no"}
                      onChange={(e) =>
                        handleChangeAssessmentSetting(e, "ufbootOption")
                      }
                    />
                    <InputLabel htmlFor="no" className={classes.radioLabel}>
                      No
                    </InputLabel>
                  </div>
                </div>
              </div>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Multi-partition sampling strategy:
                </Typography>
                <div className={clsx(classes.radioInput, classes.selectMargin)}>
                  <input
                    type="radio"
                    name="strategy"
                    id="site"
                    value="SITE"
                    checked={
                      settingField.assessment.multiPartitionSamplingStrategy ===
                      "SITE"
                    }
                    onChange={(e) =>
                      handleChangeAssessmentSetting(
                        e,
                        "multiPartitionSamplingStrategy"
                      )
                    }
                  />
                  <InputLabel htmlFor="site" className={classes.radioLabel}>
                    Resampling the sites within partitions
                  </InputLabel>
                </div>
                <div className={clsx(classes.radioInput, classes.selectMargin)}>
                  <input
                    type="radio"
                    name="strategy"
                    id="gene"
                    value="GENE"
                    checked={
                      settingField.assessment.multiPartitionSamplingStrategy ===
                      "GENE"
                    }
                    onChange={(e) =>
                      handleChangeAssessmentSetting(
                        e,
                        "multiPartitionSamplingStrategy"
                      )
                    }
                  />
                  <InputLabel htmlFor="gene" className={classes.radioLabel}>
                    Resampling partitions
                  </InputLabel>
                </div>
                <div className={clsx(classes.radioInput, classes.selectMargin)}>
                  <input
                    type="radio"
                    name="strategy"
                    id="genesite"
                    value="GENESITE"
                    checked={
                      settingField.assessment.multiPartitionSamplingStrategy ===
                      "GENESITE"
                    }
                    onChange={(e) =>
                      handleChangeAssessmentSetting(
                        e,
                        "multiPartitionSamplingStrategy"
                      )
                    }
                  />
                  <InputLabel htmlFor="genesite" className={classes.radioLabel}>
                    Resampling partitions and then sites
                  </InputLabel>
                </div>
              </div>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Single branch tests:
                </Typography>
                <div className={clsx(classes.radioInput, classes.selectMargin)}>
                  <input
                    type="checkbox"
                    id="test1"
                    value="alrt 0"
                    checked={
                      settingField.assessment.singleBranchTest.parametric
                    }
                    onChange={(e) =>
                      handleChangeAssessmentMultiple(
                        e,
                        "singleBranchTest",
                        "parametric"
                      )
                    }
                  />
                  <InputLabel htmlFor="test1" className={classes.radioLabel}>
                    Parametric aLRT test
                  </InputLabel>
                </div>
                <div className={clsx(classes.radioInput, classes.selectMargin)}>
                  <input
                    type="checkbox"
                    id="test2"
                    value="alrt NUM"
                    checked={settingField.assessment.singleBranchTest.SHlike}
                    onChange={(e) =>
                      handleChangeAssessmentMultiple(
                        e,
                        "singleBranchTest",
                        "SHlike"
                      )
                    }
                  />
                  <InputLabel htmlFor="test2" className={classes.radioLabel}>
                    SH-like approximate likelihood ratio test
                  </InputLabel>
                </div>
                <div className={clsx(classes.radioInput, classes.selectMargin)}>
                  <input
                    type="checkbox"
                    id="test3"
                    value="abayes"
                    checked={settingField.assessment.singleBranchTest.aBayes}
                    onChange={(e) =>
                      handleChangeAssessmentMultiple(
                        e,
                        "singleBranchTest",
                        "aBayes"
                      )
                    }
                  />
                  <InputLabel htmlFor="test3" className={classes.radioLabel}>
                    aBayes test
                  </InputLabel>
                </div>
                <div className={clsx(classes.radioInput, classes.selectMargin)}>
                  <input
                    type="checkbox"
                    id="test4"
                    value="lbp NUM"
                    checked={
                      settingField.assessment.singleBranchTest.localBootstrap
                    }
                    onChange={(e) =>
                      handleChangeAssessmentMultiple(
                        e,
                        "singleBranchTest",
                        "localBootstrap"
                      )
                    }
                  />
                  <InputLabel htmlFor="test4" className={classes.radioLabel}>
                    Local bootstrap test
                  </InputLabel>
                </div>
              </div>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Concordance factor:
                </Typography>
                <div className={clsx(classes.radioInput, classes.selectMargin)}>
                  <OutlinedInput
                    className={classes.textInput}
                    placeholder="gCF"
                    value={settingField.assessment.concordanceFactor.gCF}
                    onChange={(e) =>
                      handleChangeAssessmentMultiple(
                        e,
                        "concordanceFactor",
                        "gCF"
                      )
                    }
                    startAdornment={<Directory />}
                  />
                </div>
                <div className={clsx(classes.radioInput, classes.selectMargin)}>
                  <OutlinedInput
                    type="number"
                    className={classes.textInput}
                    placeholder="sCF"
                    value={settingField.assessment.concordanceFactor.sCF}
                    onChange={(e) =>
                      handleChangeAssessmentMultiple(
                        e,
                        "concordanceFactor",
                        "sCF"
                      )
                    }
                  />
                </div>
              </div>
            </form>
          )}
          {currentOption === "dating" && (
            <form className={classes.settingDetail}>
              <Typography className={classes.settingDetailTitle}>
                Dating
              </Typography>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Available date info type
                </Typography>
                <Select
                  className={classes.shortTextInput}
                  variant="outlined"
                  value={settingField.dating.availableDateInfoType}
                  onChange={(e) =>
                    handleChangeDatingSetting(e, "availableDateInfoType")
                  }
                >
                  <MenuItem value="tip">Tip dates </MenuItem>
                  <MenuItem value="ancestral">Ancestral date</MenuItem>
                  <MenuItem value="none">None</MenuItem>
                </Select>
              </div>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Date extraction from taxon names in alignment file
                </Typography>
                <Select
                  className={classes.shortTextInput}
                  variant="outlined"
                  value={settingField.dating.dateExtraction}
                  onChange={(e) =>
                    handleChangeDatingSetting(e, "dateExtraction")
                  }
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </div>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Date file
                </Typography>
                <OutlinedInput
                  className={classes.textInput}
                  value={settingField.dating.dateFile}
                  placeholder="Path"
                  onChange={(e) => handleChangeDatingSetting(e, "dateFile")}
                  startAdornment={<Directory />}
                />
              </div>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Branch containing outgroup
                </Typography>
                <Select
                  className={classes.textInput}
                  variant="outlined"
                  value={settingField.dating.branchContainingOutgroup}
                  onChange={(e) =>
                    handleChangeDatingSetting(e, "branchContainingOutgroup")
                  }
                >
                  <MenuItem value="autoDetect">Auto-detect</MenuItem>
                  <MenuItem value="Taxa_name_1, Taxa_name_2">
                    Taxa_name_1, Taxa_name_2
                  </MenuItem>
                </Select>
              </div>
            </form>
          )}
          {currentOption === "others" && (
            <form className={classes.settingDetail}>
              <Typography className={classes.settingDetailTitle}>
                Others
              </Typography>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Number of CPU cores
                </Typography>
                <OutlinedInput
                  type="number"
                  className={classes.textInput}
                  value={settingField.others.numberOfCPUCores}
                  placeholder="Number of cores"
                  onChange={(e) =>
                    handleChangeOthersSetting(e, "numberOfCPUCores")
                  }
                />
              </div>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Prefix for all output files
                </Typography>
                <OutlinedInput
                  className={classes.textInput}
                  value={settingField.others.prefix}
                  placeholder="Prefix"
                  onChange={(e) => handleChangeOthersSetting(e, "prefix")}
                />
              </div>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Enter command line
                </Typography>
                <OutlinedInput
                  className={classes.textInput}
                  value={settingField.others.enterCommandLine}
                  placeholder="Command line"
                  onChange={(e) =>
                    handleChangeOthersSetting(e, "enterCommandLine")
                  }
                />
              </div>
            </form>
          )}
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              className={classes.button1}
              onClick={handleSaveSetting}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              className={classes.button2}
              onClick={handleCloseSetting}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingDetail;
