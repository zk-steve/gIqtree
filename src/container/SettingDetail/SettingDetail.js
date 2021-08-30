import {
  Divider,
  Typography,
  Input,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
} from "@material-ui/core";
import clsx from "clsx";
import SettingMenu from "component/SettingMenu/SettingMenu";
import React, { useState } from "react";
import { DownArrow } from "shared/icons";
import useStyles from "./styles";

function SettingDetail({ handleCloseSetting }) {
  const classes = useStyles();
  const [settingField, setSettingField] = useState({
    data: {
      sequence: "autoDetect",
      codon: null,
    },
    model: {
      modelFinder: "jc",
      proportionOfInvariableSites: "",
      rateCategories: "gamma",
    },
    tree: {},
    assessment: {
      multiPartitionSamplingStrategy: "SITE",
    },
    dating: {},
    others: {},
  });
  const [currentOption, setCurrentOption] = useState("data");
  const settingDetail = {
    data: {
      textInput: [
        {
          title: "Proportion of invariable sites:",
          id: "proportion",
          value: "",
        },
        { title: "Partition file:", id: "proportion", value: "" },
      ],
      sequenceType: [
        {
          label: "Auto-detect",
          value: "autoDetect",
          id: "autoDetect",
          name: "sequence",
        },
        { label: "DNA", value: "dna", id: "dna", name: "sequence" },
        { label: "Protein", value: "protein", id: "protein", name: "sequence" },
        { label: "Codon", value: "codon", id: "codon", name: "sequence" },
        { label: "Binary", value: "binary", id: "binary", name: "sequence" },
        {
          label: "Morphology",
          value: "morphology",
          id: "morphology",
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
          label:
            "CODON6 - The Ciliate, Dasycladacean and Hexamita Nuclear Code",
          value: "codon5",
          id: "codon5",
          name: "codon",
        },
        {
          label: "CODON1 - The Standard Code (same as -st CODON)",
          value: "codon6",
          id: "codon6",
          name: "codon",
        },
        {
          label: "CODON1 - The Standard Code (same as -st CODON)",
          value: "codon7",
          id: "codon7",
          name: "codon",
        },
        {
          label: "CODON1 - The Standard Code (same as -st CODON)",
          value: "codon8",
          id: "codon8",
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
          value: "jc",
          id: "jc",
          name: "modelFinderList",
          df: 0,
          explanation: "Equal substitution rates and equal base frequencies",
        },
        {
          label: "F81",
          value: "f81",
          id: "f81",
          name: "modelFinderList",
          df: 3,
          explanation: "Equal rates but unequal base freq",
        },
        {
          label: "K80 or K2P",
          value: "k80",
          id: "k80",
          name: "modelFinderList",
          df: 1,
          explanation:
            "Unequal transition/transversion rates and equal base freq",
        },
        {
          label: "HKY or HKY85",
          value: "HKY",
          id: "4",
          name: "modelFinderList",
          df: 4,
          explanation:
            "Unequal transition/transversion rates and unequal base freqfreq",
        },
      ],
      rateCategories: [
        { label: "Gamma", value: "gamma" },
        { label: "Gamma", value: "gamma" },
      ],
      stateFrequency: [
        {
          label: "Empirical state frequencies from the data: +F",
          id: "first",
          value: "smt",
          name: "stateFrequency",
        },
        {
          label: "ML optimized state frequencies from the data: +FO",
          id: "second",
          value: "smt",
          name: "stateFrequency",
        },
      ],
    },
  };
  const { data, model } = settingDetail;
  const handleCheckRadio = (e) => {
    setSettingField({
      ...settingField,
      data: { ...settingField.data, sequence: e.target.value },
    });
  };
  const handleSelectNavigatorOption = (option) => {
    if (option !== currentOption) setCurrentOption(option);
  };
  const handleChangeDropDown = (e) => {
    setSettingField({
      ...settingField,
      model: { ...settingField.model, rateCategories: e.target.value },
    });
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
        <div>
          {currentOption === "data" && (
            <form className={classes.settingDetail}>
              <Typography className={classes.settingDetailTitle}>
                Data
              </Typography>
              {data.textInput.map((input, index) => (
                <div className={classes.textInputContainer} key={index}>
                  <InputLabel htmlFor={input.id} className={classes.inputLabel}>
                    {input.title}
                  </InputLabel>
                  <OutlinedInput
                    id={input.id}
                    className={classes.textInput}
                    value={input.value}
                  />
                </div>
              ))}
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
                        onChange={handleCheckRadio}
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
                {settingField.data.sequence === "codon" && (
                  <div className={classes.codonList}>
                    {data.codonList.map((input, index) => (
                      <div className={classes.radioInput} key={index}>
                        <input
                          type="radio"
                          name={input.name}
                          id={input.id}
                          value={input.value}
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
                        onChange={handleCheckRadio}
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
                            setSettingField({
                              ...setSettingField,
                              model: {
                                ...settingField.model,
                                modelFinder: e.target.value,
                              },
                            })
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
                        setSettingField({
                          ...settingField,
                          model: {
                            ...settingField.model,
                            proportionOfInvariableSites: e.target.value,
                          },
                        });
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
                      onChange={handleChangeDropDown}
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
                      <input
                        type="radio"
                        name={input.name}
                        id={input.id}
                        value={input.value}
                      />
                      <InputLabel
                        htmlFor={input.id}
                        className={classes.radioLabel}
                      >
                        {input.label}
                      </InputLabel>
                    </div>
                  ))}
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="radio"
                      name="stateFrequency"
                      id="third"
                      value="smt"
                    />
                    <InputLabel htmlFor="third" className={classes.radioLabel}>
                      Equal state frequency
                    </InputLabel>
                    <Select
                      variant="outlined"
                      className={clsx(
                        classes.shortTextInput,
                        classes.selectMarginLeft
                      )}
                      value="+fq"
                      onChange={handleChangeDropDown}
                    >
                      <MenuItem value="+fq">+FQ</MenuItem>
                    </Select>
                  </div>
                </div>
                <div className={classes.textInputContainer}>
                  <Typography className={classes.inputLabel}>
                    Ascertainment bias correction
                  </Typography>
                  <OutlinedInput
                    className={classes.shortTextInput}
                    defaultValue="+ASC"
                    placeholder="+ASC"
                  ></OutlinedInput>
                </div>
                <div className={classes.textInputContainer}>
                  <Typography className={classes.inputLabel}>
                    Auto-merge partitions
                  </Typography>
                  <div className={classes.twoOption}>
                    <div
                      className={clsx(classes.radioInput, classes.selectMargin)}
                    >
                      <input
                        type="radio"
                        name="autoMerge"
                        id="yes"
                        value={true}
                        checked
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
                        name="autoMerge"
                        id="no"
                        value={false}
                      />
                      <InputLabel htmlFor="no" className={classes.radioLabel}>
                        No
                      </InputLabel>
                    </div>
                  </div>
                </div>
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
                      value={true}
                      checked
                    />
                    <InputLabel htmlFor="greedy" className={classes.radioLabel}>
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
                      value={true}
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
                      value={true}
                      checked
                    />
                    <InputLabel
                      htmlFor="rclusterf"
                      className={classes.radioLabel}
                    >
                      RClusterf
                    </InputLabel>
                  </div>
                </div>
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
                      value={true}
                      checked
                    />
                    <InputLabel htmlFor="yes" className={classes.radioLabel}>
                      Yes
                    </InputLabel>
                  </div>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input type="radio" name="on" id="no" value={false} />
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
                <OutlinedInput className={classes.shortTextInput} value={100} />
              </div>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Perturbation strength (between 0 and 1) for randomized NNI:
                </Typography>
                <OutlinedInput className={classes.shortTextInput} value={0.5} />
              </div>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Constrained tree file
                </Typography>
                <OutlinedInput className={classes.textInput} value="" />
              </div>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Reference tree
                </Typography>
                <OutlinedInput className={classes.textInput} value="" />
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
                  value="none"
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
                      name="on"
                      id="yes"
                      value={true}
                      checked
                    />
                    <InputLabel htmlFor="yes" className={classes.radioLabel}>
                      Yes
                    </InputLabel>
                  </div>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input type="radio" name="on" id="no" value={false} />
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
                      setSettingField({
                        ...settingField,
                        assessment: {
                          ...settingField.assessment,
                          multiPartitionSamplingStrategy: e.target.value,
                        },
                      })
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
                      setSettingField({
                        ...settingField,
                        assessment: {
                          ...settingField.assessment,
                          multiPartitionSamplingStrategy: e.target.value,
                        },
                      })
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
                      setSettingField({
                        ...settingField,
                        assessment: {
                          ...settingField.assessment,
                          multiPartitionSamplingStrategy: e.target.value,
                        },
                      })
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
                  <input type="checkbox" id="test1" value="alrt 0" />
                  <InputLabel htmlFor="test1" className={classes.radioLabel}>
                    Parametric aLRT test
                  </InputLabel>
                </div>
                <div className={clsx(classes.radioInput, classes.selectMargin)}>
                  <input type="checkbox" id="test2" value="alrt NUM" />
                  <InputLabel htmlFor="test2" className={classes.radioLabel}>
                    SH-like approximate likelihood ratio test
                  </InputLabel>
                </div>
                <div className={clsx(classes.radioInput, classes.selectMargin)}>
                  <input type="checkbox" id="test3" value="abayes" />
                  <InputLabel htmlFor="test3" className={classes.radioLabel}>
                    aBayes test
                  </InputLabel>
                </div>
                <div className={clsx(classes.radioInput, classes.selectMargin)}>
                  <input type="checkbox" id="test4" value="lbp NUM" />
                  <InputLabel htmlFor="test4" className={classes.radioLabel}>
                    Local bootstrap test
                  </InputLabel>
                </div>
              </div>
              <div className={classes.textInputContainer}>
                <Typography className={classes.inputLabel}>
                  Concordance factor:
                </Typography>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingDetail;
