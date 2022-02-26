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
import { PROJECT_STATUS } from "pages/ProjectPage/ProjectPage";
import React, { useState, useEffect } from "react";
import { Directory, CloseFile } from "shared/icons";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");

function SettingDetail({
  handleCloseSetting,
  multiPartition,
  projectSetting,
  handleTestSetting,
  id,
  projectPath,
  projectStatus,
}) {
  const reviewBox = (path, deleteAction, deleteActionArray = null) => {
    if (typeof path === "string" && path !== "")
      return (
        <div className={classes.boxReviewPath}>
          <div>
            <Typography align="left" title={path}>
              {path}
            </Typography>
            <CloseFile onClick={deleteAction} />
          </div>
        </div>
      );
    else if (path.length > 0)
      return (
        <div className={classes.boxReviewPath}>
          {path.map((file, index) => (
            <div key={index}>
              <Typography align="left" title={file}>
                {file}
              </Typography>
              <CloseFile onClick={() => deleteActionArray(file)} />
            </div>
          ))}
        </div>
      );
  };
  const classes = useStyles();
  const [settingField, setSettingField] = useState({ ...projectSetting } || {});
  const [currentOption, setCurrentOption] = useState("data");
  const [currentPathOption, setCurrentPathOption] = useState([]);

  useEffect(() => {
    // handleTestSetting(settingField);
    console.log(settingField);
  }, [settingField]);
  useEffect(() => {
    const handleChangePathOption = (option, subOption, path) => {
      if (subOption !== "concordanceFactor") {
        setSettingField({
          ...settingField,
          [option]: { ...settingField[option], [subOption]: path },
        });
      } else
        setSettingField({
          ...settingField,
          [option]: {
            ...settingField[option],
            [subOption]: { ...settingField[option][subOption], gCF: path },
          },
        });
    };
    const chooseFileResult = (event, data) => {
      const { status, message } = data;
      if (status === 1)
        handleChangePathOption(
          currentPathOption[0],
          currentPathOption[1],
          message
        );
    };
    ipcRenderer.once("chooseFileResult", chooseFileResult);
    ipcRenderer.once("chooseMultiFileResult", chooseFileResult);
    ipcRenderer.once("chooseFolderResult", chooseFileResult);
    return () => {
      ipcRenderer.removeListener("chooseFileResult", chooseFileResult);
      ipcRenderer.removeListener("chooseMultiFileResult", chooseFileResult);
      ipcRenderer.removeListener("chooseFolderResult", chooseFileResult);
    };
  }, [currentPathOption, settingField]);
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
          label: "Auto",
          value: "auto",
          id: "auto",
          name: "auto",
        },
      ],
      modelFinder: [
        {
          label: "Auto",
          value: "auto",
          id: "auto",
          name: "modelFinderList",
          type: "autoDetect",
        },
        {
          label: "JC2",
          value: "JC2",
          id: "JC2",
          name: "modelFinderList",
          type: "BIN",
        },
        {
          label: "GTR2",
          value: "GTR2",
          id: "GTR2",
          name: "modelFinderList",
          type: "BIN",
        },
        {
          label: "JC",
          value: "JC",
          id: "JC",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "F81",
          value: "F81",
          id: "F81",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "HKI",
          value: "HKI",
          id: "HKI",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "TNe",
          value: "TNe",
          id: "TNe",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "TN",
          value: "TN",
          id: "TN",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "K81",
          value: "K81",
          id: "K81",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "K81u",
          value: "K81u",
          id: "K81u",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "TPM2",
          value: "TPM2",
          id: "TPM2",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "TPM2u",
          value: "TPM2u",
          id: "TPM2u",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "TPM3",
          value: "TPM3",
          id: "TPM3",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "TPM3u",
          value: "TPM3u",
          id: "TPM3u",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "TIM",
          value: "TIM",
          id: "TIM",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "TIMe",
          value: "TIMe",
          id: "TIMe",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "TIM2",
          value: "TIM2",
          id: "TIM2",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "TIM2e",
          value: "TIM2e",
          id: "TIM2e",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "TIM3",
          value: "TIM3",
          id: "TIM3",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "TIM3e",
          value: "TIM3e",
          id: "TIM3e",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "TVM",
          value: "TVM",
          id: "TVM",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "TVMe",
          value: "TVMe",
          id: "TVMe",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "SYM",
          value: "SYM",
          id: "SYM",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "GTR",
          value: "GTR",
          id: "GTR",
          name: "modelFinderList",
          type: "DNA",
        },
        {
          label: "Blosum62",
          value: "Blosum62",
          id: "Blosum62",
          name: "modelFinderList",
          type: "AA",
        },
        {
          label: "cpREV",
          value: "cpREV",
          id: "cpREV",
          name: "modelFinderList",
          type: "AA",
        },
        {
          label: "Dayhoff",
          value: "Dayhoff",
          id: "Dayhoff",
          name: "modelFinderList",
          type: "AA",
        },
        {
          label: "DCMut",
          value: "DCMut",
          id: "DCMut",
          name: "modelFinderList",
          type: "AA",
        },
        {
          label: "FLU",
          value: "FLU",
          id: "FLU",
          name: "modelFinderList",
          type: "AA",
        },
        {
          label: "HIVb",
          value: "HIVb",
          id: "HIVb",
          name: "modelFinderList",
          type: "AA",
        },
        {
          label: "HIVw",
          value: "HIVw",
          id: "HIVw",
          name: "modelFinderList",
          type: "AA",
        },
        {
          label: "JTT",
          value: "JTT",
          id: "JTT",
          name: "modelFinderList",
          type: "AA",
        },
        {
          label: "JTTDCMut",
          value: "JTTDCMut",
          id: "JTTDCMut",
          name: "modelFinderList",
          type: "AA",
        },
        {
          label: "LG",
          value: "LG",
          id: "LG",
          name: "modelFinderList",
          type: "AA",
        },
        {
          label: "mtART",
          value: "mtART",
          id: "mtART",
          name: "modelFinderList",
          type: "AA",
        },
        {
          label: "mtMAM",
          value: "mtMAM",
          id: "mtMAM",
          name: "modelFinderList",
          type: "AA",
        },
        {
          label: "PMB",
          value: "PMB",
          id: "PMB",
          name: "modelFinderList",
          type: "AA",
        },
        {
          label: "rtREV",
          value: "rtREV",
          id: "rtREV",
          name: "modelFinderList",
          type: "AA",
        },
        {
          label: "VT",
          value: "VT",
          id: "VT",
          name: "modelFinderList",
          type: "AA",
        },
        {
          label: "WAG",
          value: "WAG",
          id: "WAG",
          name: "modelFinderList",
          type: "AA",
        },
        {
          label: "LG4M",
          value: "LG4M",
          id: "LG4M",
          name: "modelFinderList",
          type: "NT2AA",
        },
        {
          label: "LG4X",
          value: "LG4X",
          id: "LG4X",
          name: "modelFinderList",
          type: "NT2AA",
        },
        {
          label: "JTT+CF4",
          value: "JTT+CF4",
          id: "JTT+CF4",
          name: "modelFinderList",
          type: "NT2AA",
        },
        {
          label: "C10",
          value: "C10",
          id: "C10",
          name: "modelFinderList",
          type: "NT2AA",
        },
        {
          label: "C20",
          value: "C20",
          id: "C20",
          name: "modelFinderList",
          type: "NT2AA",
        },
        {
          label: "EX2",
          value: "EX2",
          id: "EX2",
          name: "modelFinderList",
          type: "NT2AA",
        },
        {
          label: "EX3",
          value: "EX3",
          id: "EX3",
          name: "modelFinderList",
          type: "NT2AA",
        },
        {
          label: "EHO",
          value: "EHO",
          id: "EHO",
          name: "modelFinderList",
          type: "NT2AA",
        },
        {
          label: "UL2",
          value: "UL2",
          id: "UL2",
          name: "modelFinderList",
          type: "NT2AA",
        },
        {
          label: "UL3",
          value: "UL3",
          id: "UL3",
          name: "modelFinderList",
          type: "NT2AA",
        },
        {
          label: "EX_EHO",
          value: "EX_EHO",
          id: "EX_EHO",
          name: "modelFinderList",
          type: "NT2AA",
        },
        {
          label: "GY",
          value: "GY",
          id: "GY",
          name: "modelFinderList",
          type: "CODON",
        },
        {
          label: "MG",
          value: "MG",
          id: "MG",
          name: "modelFinderList",
          type: "CODON",
        },
        {
          label: "MGK",
          value: "MGK",
          id: "MGK",
          name: "modelFinderList",
          type: "CODON",
        },
        {
          label: "GY0K",
          value: "GY0K",
          id: "GY0K",
          name: "modelFinderList",
          type: "CODON",
        },
        {
          label: "GY1KTS",
          value: "GY1KTS",
          id: "GY1KTS",
          name: "modelFinderList",
          type: "CODON",
        },
        {
          label: "GY1KTV",
          value: "GY1KTV",
          id: "GY1KTV",
          name: "modelFinderList",
          type: "CODON",
        },
        {
          label: "GY2K",
          value: "GY2K",
          id: "GY2K",
          name: "modelFinderList",
          type: "CODON",
        },
        {
          label: "MG1KTS",
          value: "MG1KTS",
          id: "MG1KTS",
          name: "modelFinderList",
          type: "CODON",
        },
        {
          label: "MG1KTV",
          value: "MG1KTV",
          id: "MG1KTV",
          name: "modelFinderList",
          type: "CODON",
        },
        {
          label: "MG2K",
          value: "MG2K",
          id: "MG2K",
          name: "modelFinderList",
          type: "CODON",
        },
        {
          label: "KOSI07",
          value: "KOSI07",
          id: "KOSI07",
          name: "modelFinderList",
          type: "CODON",
        },
        {
          label: "SCHN05",
          value: "SCHN05",
          id: "SCHN05",
          name: "modelFinderList",
          type: "CODON",
        },
        {
          label: "MK",
          value: "MK",
          id: "MK",
          name: "modelFinderList",
          type: "MORPH",
        },
        {
          label: "ORDERED",
          value: "ORDERED",
          id: "ORDERED",
          name: "modelFinderList",
          type: "MORPH",
        },
      ],
      rateCategories: [
        { label: "Gamma", value: "Gamma", id: "gamma" },
        { label: "FreeRate", value: "FreeRate", id: "freeRate" },
      ],
      stateFrequency:
        settingField.data.sequence === "CODON"
          ? [
              {
                label: "None",
                id: "none",
                value: "none",
                name: "stateFrequency",
              },
              {
                label: "Empirical state frequencies from the data: +F",
                id: "+F",
                value: "+F",
                name: "stateFrequency",
              },
              {
                label: "ML optimized state frequencies from the data: +FO",
                id: "+F0",
                value: "+F0",
                name: "stateFrequency",
              },
              {
                label: "Equal state frequencies: +FQ",
                id: "+FQ",
                value: "+FQ",
                name: "stateFrequency",
              },
              {
                label: "+F1x4",
                id: "+F1x4",
                value: "+F1x4",
                name: "stateFrequency",
              },
              {
                label: "+F3x4",
                id: "+F3x4",
                value: "+F3x4",
                name: "stateFrequency",
              },
            ]
          : [
              {
                label: "None",
                id: "none",
                value: "none",
                name: "stateFrequency",
              },
              {
                label: "Empirical state frequencies from the data: +F",
                id: "+F",
                value: "+F",
                name: "stateFrequency",
              },
              {
                label: "ML optimized state frequencies from the data: +FO",
                id: "+F0",
                value: "+F0",
                name: "stateFrequency",
              },
              {
                label: "Equal state frequencies: +FQ",
                id: "+FQ",
                value: "+FQ",
                name: "stateFrequency",
              },
            ],
    },
  };
  const { data, model } = settingDetail;
  const handleSelectNavigatorOption = (option) => {
    if (option !== currentOption) setCurrentOption(option);
  };
  const handleChangeDataSetting = (value, property) => {
    setSettingField({
      ...settingField,
      data: {
        ...settingField.data,
        [property]: value,
      },
    });
  };
  const handleChangeModelSetting = (value, property) => {
    setSettingField({
      ...settingField,
      model: {
        ...settingField.model,
        [property]: value,
      },
    });
  };
  const handleChangeTreeSetting = (value, property) => {
    setSettingField({
      ...settingField,
      tree: {
        ...settingField.tree,
        [property]: value,
      },
    });
  };
  const handleChangeAssessmentSetting = (value, property) => {
    setSettingField({
      ...settingField,
      assessment: {
        ...settingField.assessment,
        [property]: value,
      },
    });
  };
  const handleChangeDatingSetting = (value, property) => {
    setSettingField({
      ...settingField,
      dating: {
        ...settingField.dating,
        [property]: value,
      },
    });
  };
  const handleChangeOthersSetting = (value, property) => {
    setSettingField({
      ...settingField,
      others: {
        ...settingField.others,
        [property]: value,
      },
    });
  };
  const handleChangeAssessmentMultiple = (value, property, subProperty) => {
    setSettingField({
      ...settingField,
      assessment: {
        ...settingField.assessment,
        [property]: {
          ...settingField.assessment[property],
          [subProperty]: value,
        },
      },
    });
  };
  const handleSaveSetting = () => {
    ipcRenderer.invoke("saveSetting", projectPath, settingField);
  };
  const handleChooseFile = (option, subOption) => {
    ipcRenderer.send("chooseFile", projectPath);
    setCurrentPathOption([option, subOption]);
  };
  const handleResetSetting = () => {
    setSettingField({ ...projectSetting });
  };
  const handleChooseMultiFile = (option, subOption) => {
    ipcRenderer.send("chooseMultiFile", projectPath);
    setCurrentPathOption([option, subOption]);
  };
  const handleChooseFolder = (option, subOption) => {
    ipcRenderer.send("chooseFolder", projectPath);
    setCurrentPathOption([option, subOption]);
  };
  const handleDeleteInArray = (value) => {
    const newAlignmentFiles = settingField.data.alignment.filter(
      (file) => file !== value
    );
    handleChangeDataSetting(newAlignmentFiles, "alignment");
  };
  return (
    settingField && (
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
                  <InputLabel
                    htmlFor="alignment"
                    className={classes.inputLabel}
                  >
                    Alignment file(s) and folder
                  </InputLabel>
                  <div>
                    <Button
                      variant="outlined"
                      className={classes.importButton}
                      onClick={() => handleChooseMultiFile("data", "alignment")}
                    >
                      <Directory />
                      <Typography>Choose file(s)</Typography>
                    </Button>
                    &nbsp;or&nbsp;
                    <Button
                      variant="outlined"
                      className={classes.importButton}
                      onClick={() => handleChooseFolder("data", "alignment")}
                    >
                      <Directory />
                      <Typography>Choose folder</Typography>
                    </Button>
                  </div>
                  {reviewBox(
                    settingField.data.alignment,
                    () => handleChangeDataSetting("", "alignment"),
                    handleDeleteInArray
                  )}
                </div>
                <div className={classes.textInputContainer}>
                  <InputLabel
                    htmlFor="partition"
                    className={classes.inputLabel}
                  >
                    Partition file
                  </InputLabel>
                  <Button
                    variant="outlined"
                    className={classes.importButton}
                    onClick={() => handleChooseFile("data", "partition")}
                  >
                    <Directory />
                    <Typography>Choose file</Typography>
                  </Button>
                  {reviewBox(settingField.data.partition, () =>
                    handleChangeDataSetting("", "partition")
                  )}
                </div>
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
                          onChange={(e) =>
                            handleChangeDataSetting(e.target.value, "sequence")
                          }
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
                            onChange={(e) =>
                              handleChangeDataSetting(e.target.value, "codon")
                            }
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
                      handleChangeDataSetting(e.target.value, "partitionType")
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
                    {/* {model.substitutionModel.map((input, index) => (
                      <div className={classes.radioInput} key={index}>
                        <input
                          type="checkbox"
                          name={input.name}
                          id={input.id}
                          value={input.value}
                          checked={
                            settingField.model.modelFinder === input.value
                          }
                        />
                        <InputLabel
                          htmlFor={input.id}
                          className={classes.radioLabel}
                        >
                          {input.label}
                        </InputLabel>
                      </div>
                    ))} */}
                  </div>
                  {/* <div
                      className={clsx(
                        classes.modelFinderHead,
                        classes.modelTableHead
                      )}
                    >
                      <Typography id="model">Model</Typography>
                    </div> */}
                  <Select
                    name="modelFinder"
                    value={settingField.model.modelFinder}
                    className={classes.shortTextInput}
                    onChange={(e) =>
                      handleChangeModelSetting(e.target.value, "modelFinder")
                    }
                  >
                    {model.modelFinder
                      .filter(
                        (model) =>
                          model.type === settingField.data.sequence ||
                          model.type === "autoDetect"
                      )
                      .map((input, index) => (
                        // <div className={classes.radioInput} key={index}>
                        //   <input
                        //     type="radio"
                        //     name={input.name}
                        //     id={input.id}
                        //     value={input.value}
                        //     checked={
                        //       settingField.model.modelFinder === input.value
                        //     }
                        //     onChange={(e) =>
                        //       handleChangeModelSetting(
                        //         e.target.value,
                        //         "modelFinder"
                        //       )
                        //     }
                        //   />
                        //   <InputLabel
                        //     htmlFor={input.id}
                        //     className={clsx(
                        //       classes.radioLabel,
                        //       classes.modelMargin,
                        //       classes.fontSmall
                        //     )}
                        //   >
                        //     {input.label}
                        //   </InputLabel>
                        // </div>
                        <MenuItem value={input.value}>{input.label}</MenuItem>
                      ))}
                  </Select>
                  <div className={classes.textInputContainer}>
                    <Typography className={classes.inputLabel}>
                      Rate heterogeneity across sites:
                    </Typography>
                    <div
                      className={clsx(classes.shortPath, classes.selectMargin)}
                    >
                      <Typography align="left">
                        Allowing proportion of invariable sites
                      </Typography>
                      <div className={classes.twoOption}>
                        <div className={classes.radioInput}>
                          <input
                            type="radio"
                            name="on"
                            id="yes"
                            value="yes"
                            checked={
                              settingField.model.proportionOfInvariableSites ===
                              "yes"
                            }
                            onChange={(e) =>
                              handleChangeModelSetting(
                                e.target.value,
                                "proportionOfInvariableSites"
                              )
                            }
                          />
                          <InputLabel
                            htmlFor="yes"
                            className={classes.radioLabel}
                          >
                            Yes
                          </InputLabel>
                        </div>
                        <div className={classes.radioInput}>
                          <input
                            type="radio"
                            name="on"
                            id="no"
                            value="no"
                            checked={
                              settingField.model.proportionOfInvariableSites ===
                              "no"
                            }
                            onChange={(e) =>
                              handleChangeModelSetting(
                                e.target.value,
                                "proportionOfInvariableSites"
                              )
                            }
                          />
                          <InputLabel
                            htmlFor="no"
                            className={classes.radioLabel}
                          >
                            No
                          </InputLabel>
                        </div>
                      </div>
                    </div>
                    <>
                      <div
                        className={clsx(
                          classes.shortPath,
                          classes.selectMargin
                        )}
                      >
                        <Typography align="left">RHAS Model</Typography>
                        {/* <Select
                            variant="outlined"
                            className={classes.shortTextInput}
                            value={settingField.model.rateCategories}
                            onChange={(e) =>
                              handleChangeModelSetting(
                                e.target.value,
                                "rateCategories"
                              )
                            }
                          >
                            {model.rateCategories.map((input, index) => (
                              <MenuItem value={input.value}>
                                {input.label}
                              </MenuItem>
                            ))}
                          </Select> */}
                        <div className={classes.twoOption}>
                          {settingDetail.model.rateCategories.map(
                            (input, index) => (
                              <div key={index} className={classes.radioInput}>
                                <input
                                  type="radio"
                                  name={input.name}
                                  id={input.id}
                                  value={input.value}
                                  checked={
                                    settingField.model.rateCategories ===
                                    input.value
                                  }
                                  onChange={(e) =>
                                    handleChangeModelSetting(
                                      e.target.value,
                                      "rateCategories"
                                    )
                                  }
                                />
                                <InputLabel
                                  htmlFor={input.id}
                                  className={classes.radioLabel}
                                >
                                  {input.label}
                                </InputLabel>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <div
                        className={clsx(
                          classes.shortPath,
                          classes.selectMargin
                        )}
                      >
                        <Typography align="left">#rate_categories</Typography>
                        <OutlinedInput
                          className={classes.shortTextInput}
                          type="number"
                          value={settingField.model.rateCategoriesNumber}
                          onChange={(e) =>
                            handleChangeModelSetting(
                              e.target.value,
                              "rateCategoriesNumber"
                            )
                          }
                        />
                      </div>
                    </>
                  </div>
                  <div className={classes.textInputContainer}>
                    <Typography className={classes.inputLabel}>
                      State frequency
                    </Typography>
                    {model.stateFrequency.map((input, index) => (
                      <div
                        className={clsx(
                          classes.radioInput,
                          classes.selectMargin
                        )}
                        key={index}
                      >
                        <input
                          type="radio"
                          name={input.name}
                          id={input.id}
                          value={input.value}
                          checked={
                            settingField.model.stateFrequency === input.value
                          }
                          onChange={(e) =>
                            handleChangeModelSetting(
                              e.target.value,
                              "stateFrequency"
                            )
                          }
                        />
                        <InputLabel className={clsx(classes.radioLabel)}>
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
                          handleChangeModelSetting(
                            e.target.value,
                            "mergingAlgorithm"
                          )
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
                          handleChangeModelSetting(
                            e.target.value,
                            "mergingAlgorithm"
                          )
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
                          handleChangeModelSetting(
                            e.target.value,
                            "mergingAlgorithm"
                          )
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
                    value={
                      settingField.tree.numberOfUnsuccessfulIterationsToStop
                    }
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
                  <Button
                    variant="outlined"
                    className={classes.importButton}
                    onClick={() =>
                      handleChooseFile("tree", "constrainedTreeFile")
                    }
                  >
                    <Directory />
                    <Typography>Choose file</Typography>
                  </Button>
                  {reviewBox(settingField.tree.constrainedTreeFile, () =>
                    handleChangeTreeSetting("", "constrainedTreeFile")
                  )}
                </div>
                <div className={classes.textInputContainer}>
                  <Typography className={classes.inputLabel}>
                    Reference tree
                  </Typography>
                  <Button
                    variant="outlined"
                    className={classes.importButton}
                    onClick={() => handleChooseFile("tree", "referenceTree")}
                  >
                    <Directory />
                    <Typography>Choose file</Typography>
                  </Button>
                  {reviewBox(settingField.tree.referenceTree, () =>
                    handleChangeTreeSetting("", "referenceTree")
                  )}
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
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="radio"
                      name="boostrapMethod"
                      id="none"
                      value="none"
                      checked={
                        settingField.assessment.bootstrapMethod === "none"
                      }
                      onChange={(e) =>
                        handleChangeAssessmentSetting(
                          e.target.value,
                          "bootstrapMethod"
                        )
                      }
                    />
                    <InputLabel htmlFor="none" className={classes.radioLabel}>
                      None
                    </InputLabel>
                  </div>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="radio"
                      name="boostrapMethod"
                      id="ufboot"
                      value="ufboot"
                      checked={
                        settingField.assessment.bootstrapMethod === "ufboot"
                      }
                      onChange={(e) =>
                        handleChangeAssessmentSetting(
                          e.target.value,
                          "bootstrapMethod"
                        )
                      }
                    />
                    <InputLabel htmlFor="none" className={classes.radioLabel}>
                      UFboot
                    </InputLabel>
                  </div>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="radio"
                      name="boostrapMethod"
                      id="standard"
                      value="standard"
                      checked={
                        settingField.assessment.bootstrapMethod === "standard"
                      }
                      onChange={(e) =>
                        handleChangeAssessmentSetting(
                          e.target.value,
                          "bootstrapMethod"
                        )
                      }
                    />
                    <InputLabel
                      htmlFor="standard"
                      className={classes.radioLabel}
                    >
                      Standard
                    </InputLabel>
                  </div>
                  {settingField.assessment.bootstrapMethod !== "none" && (
                    <OutlinedInput
                      type="number"
                      placeholder="#replicate"
                      className={clsx(
                        classes.shortTextInput,
                        classes.selectMargin
                      )}
                      value={settingField.assessment.bootstrapMethodReplicate}
                      onChange={(e) =>
                        handleChangeAssessmentSetting(
                          e.target.value,
                          "bootstrapMethodReplicate"
                        )
                      }
                    />
                  )}
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
                          handleChangeAssessmentSetting(
                            e.target.value,
                            "ufbootOption"
                          )
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
                          handleChangeAssessmentSetting(
                            e.target.value,
                            "ufbootOption"
                          )
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
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="radio"
                      name="strategy"
                      id="site"
                      value="SITE"
                      checked={
                        settingField.assessment
                          .multiPartitionSamplingStrategy === "SITE"
                      }
                      onChange={(e) =>
                        handleChangeAssessmentSetting(
                          e.target.value,
                          "multiPartitionSamplingStrategy"
                        )
                      }
                    />
                    <InputLabel htmlFor="site" className={classes.radioLabel}>
                      Resampling the sites within partitions
                    </InputLabel>
                  </div>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="radio"
                      name="strategy"
                      id="gene"
                      value="GENE"
                      checked={
                        settingField.assessment
                          .multiPartitionSamplingStrategy === "GENE"
                      }
                      onChange={(e) =>
                        handleChangeAssessmentSetting(
                          e.target.value,
                          "multiPartitionSamplingStrategy"
                        )
                      }
                    />
                    <InputLabel htmlFor="gene" className={classes.radioLabel}>
                      Resampling partitions
                    </InputLabel>
                  </div>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="radio"
                      name="strategy"
                      id="genesite"
                      value="GENESITE"
                      checked={
                        settingField.assessment
                          .multiPartitionSamplingStrategy === "GENESITE"
                      }
                      onChange={(e) =>
                        handleChangeAssessmentSetting(
                          e,
                          "multiPartitionSamplingStrategy"
                        )
                      }
                    />
                    <InputLabel
                      htmlFor="genesite"
                      className={classes.radioLabel}
                    >
                      Resampling partitions and then sites
                    </InputLabel>
                  </div>
                </div>
                <div className={classes.textInputContainer}>
                  <Typography className={classes.inputLabel}>
                    Single branch tests:
                  </Typography>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="checkbox"
                      id="test1"
                      value="alrt 0"
                      checked={
                        settingField.assessment.singleBranchTest.parametric
                      }
                      onChange={(e) =>
                        handleChangeAssessmentMultiple(
                          e.target.checked,
                          "singleBranchTest",
                          "parametric"
                        )
                      }
                    />
                    <InputLabel htmlFor="test1" className={classes.radioLabel}>
                      Parametric aLRT test
                    </InputLabel>
                  </div>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="checkbox"
                      id="test2"
                      value="alrt NUM"
                      checked={settingField.assessment.singleBranchTest.SHlike}
                      onChange={(e) =>
                        handleChangeAssessmentMultiple(
                          e.target.checked,
                          "singleBranchTest",
                          "SHlike"
                        )
                      }
                    />
                    <InputLabel htmlFor="test2" className={classes.radioLabel}>
                      SH-like approximate likelihood ratio test
                    </InputLabel>
                  </div>
                  {settingField.assessment.singleBranchTest.SHlike && (
                    <OutlinedInput
                      type="number"
                      placeholder="#replicate"
                      className={clsx(
                        classes.shortTextInput,
                        classes.selectMargin
                      )}
                      value={settingField.assessment.SHlikeReplicate}
                      onChange={(e) =>
                        handleChangeAssessmentMultiple(
                          e.target.value,
                          "singleBranchTest",
                          "SHlikeReplicate"
                        )
                      }
                    />
                  )}
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="checkbox"
                      id="test3"
                      value="abayes"
                      checked={settingField.assessment.singleBranchTest.aBayes}
                      onChange={(e) =>
                        handleChangeAssessmentMultiple(
                          e.target.checked,
                          "singleBranchTest",
                          "aBayes"
                        )
                      }
                    />
                    <InputLabel htmlFor="test3" className={classes.radioLabel}>
                      aBayes test
                    </InputLabel>
                  </div>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="checkbox"
                      id="test4"
                      value="lbp NUM"
                      checked={
                        settingField.assessment.singleBranchTest.localBootstrap
                      }
                      onChange={(e) =>
                        handleChangeAssessmentMultiple(
                          e.target.checked,
                          "singleBranchTest",
                          "localBootstrap"
                        )
                      }
                    />
                    <InputLabel htmlFor="test4" className={classes.radioLabel}>
                      Local bootstrap test
                    </InputLabel>
                  </div>
                  {settingField.assessment.singleBranchTest.localBootstrap && (
                    <OutlinedInput
                      type="number"
                      placeholder="#replicate"
                      className={clsx(
                        classes.shortTextInput,
                        classes.selectMargin
                      )}
                      value={settingField.assessment.localBootstrapReplicate}
                      onChange={(e) =>
                        handleChangeAssessmentMultiple(
                          e.target.value,
                          "singleBranchTest",
                          "localBootstrapReplicate"
                        )
                      }
                    />
                  )}
                </div>
                <div className={classes.textInputContainer}>
                  <Typography className={classes.inputLabel}>
                    Concordance factor:
                  </Typography>
                  <div
                    className={clsx(
                      classes.textInputContainer,
                      classes.selectMargin
                    )}
                  >
                    <Typography align="left" style={{ marginBottom: "8px" }}>
                      gCF
                    </Typography>
                    <Button
                      variant="outlined"
                      className={classes.importButton}
                      onClick={() =>
                        handleChooseFile("assessment", "concordanceFactor")
                      }
                    >
                      <Directory />
                      <Typography>Choose file</Typography>
                    </Button>
                    {reviewBox(
                      settingField.assessment.concordanceFactor.gCF,
                      () =>
                        handleChangeAssessmentMultiple(
                          "",
                          "concordanceFactor",
                          "gCF"
                        )
                    )}
                  </div>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <OutlinedInput
                      type="number"
                      className={classes.textInput}
                      placeholder="sCF"
                      value={settingField.assessment.concordanceFactor.sCF}
                      onChange={(e) =>
                        handleChangeAssessmentMultiple(
                          e.target.value,
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
                  {/* <Select
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
                  </Select> */}
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="radio"
                      name="availableDateInfoType"
                      id="none"
                      value="none"
                      checked={
                        settingField.dating.availableDateInfoType === "none"
                      }
                      onChange={(e) =>
                        handleChangeDatingSetting(
                          e.target.value,
                          "availableDateInfoType"
                        )
                      }
                    />
                    <InputLabel htmlFor="none" className={classes.radioLabel}>
                      None
                    </InputLabel>
                  </div>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="radio"
                      name="availableDateInfoType"
                      id="tip"
                      value="tip"
                      checked={
                        settingField.dating.availableDateInfoType === "tip"
                      }
                      onChange={(e) =>
                        handleChangeDatingSetting(
                          e.target.value,
                          "availableDateInfoType"
                        )
                      }
                    />
                    <InputLabel htmlFor="tip" className={classes.radioLabel}>
                      Tip
                    </InputLabel>
                  </div>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="radio"
                      name="availableDateInfoType"
                      id="ancestral"
                      value="ancestral"
                      checked={
                        settingField.dating.availableDateInfoType ===
                        "ancestral"
                      }
                      onChange={(e) =>
                        handleChangeDatingSetting(
                          e.target.value,
                          "availableDateInfoType"
                        )
                      }
                    />
                    <InputLabel
                      htmlFor="ancestral"
                      className={classes.radioLabel}
                    >
                      Ancestral
                    </InputLabel>
                  </div>
                </div>
                <div className={classes.textInputContainer}>
                  <Typography className={classes.inputLabel}>
                    Date extraction from taxon names in alignment file
                  </Typography>
                  <div className={classes.twoOption}>
                    <div
                      className={clsx(classes.radioInput, classes.selectMargin)}
                    >
                      <input
                        type="radio"
                        name="dateExtraction"
                        id="yes"
                        value="yes"
                        checked={settingField.dating.dateExtraction === "yes"}
                        onChange={(e) =>
                          handleChangeDatingSetting(
                            e.target.value,
                            "dateExtraction"
                          )
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
                        name="dateExtraction"
                        id="no"
                        value="no"
                        checked={settingField.dating.dateExtraction === "no"}
                        onChange={(e) =>
                          handleChangeDatingSetting(
                            e.target.value,
                            "dateExtraction"
                          )
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
                    Date file
                  </Typography>
                  <Button
                    variant="outlined"
                    className={classes.importButton}
                    onClick={() => handleChooseFile("dating", "dateFile")}
                  >
                    <Directory />
                    <Typography>Choose file</Typography>
                  </Button>
                  {reviewBox(settingField.dating.dateFile, () =>
                    handleChangeDatingSetting("", "dateFile")
                  )}
                </div>
                <div className={classes.textInputContainer}>
                  <Typography className={classes.inputLabel}>
                    Branch containing outgroup
                  </Typography>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="radio"
                      name="branchContainingOutgroup"
                      id="autoDetect"
                      value="autoDetect"
                      checked={
                        settingField.dating.branchContainingOutgroup ===
                        "autoDetect"
                      }
                      onChange={(e) =>
                        handleChangeDatingSetting(
                          e.target.value,
                          "branchContainingOutgroup"
                        )
                      }
                    />
                    <InputLabel
                      htmlFor="autoDetect"
                      className={classes.radioLabel}
                    >
                      Auto-detect
                    </InputLabel>
                  </div>
                  <div
                    className={clsx(classes.radioInput, classes.selectMargin)}
                  >
                    <input
                      type="radio"
                      name="branchContainingOutgroup"
                      id="Taxa_name_1, Taxa_name_2"
                      value="Taxa_name_1, Taxa_name_2"
                      checked={
                        settingField.dating.branchContainingOutgroup ===
                        "Taxa_name_1, Taxa_name_2"
                      }
                      onChange={(e) =>
                        handleChangeDatingSetting(
                          e.target.value,
                          "branchContainingOutgroup"
                        )
                      }
                    />
                    <InputLabel
                      htmlFor="Taxa_name_1, Taxa_name_2"
                      className={classes.radioLabel}
                    >
                      Taxa_name_1, Taxa_name_2
                    </InputLabel>
                  </div>
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
                    inputProps={{
                      min: 1
                    }}
                    className={classes.textInput}
                    value={settingField.others.numberOfCPUCores}
                    placeholder="Number of cores"
                    onChange={(e) =>
                      handleChangeOthersSetting(
                        e.target.value,
                        "numberOfCPUCores"
                      )
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
                    onChange={(e) =>
                      handleChangeOthersSetting(e.target.value, "prefix")
                    }
                  />
                </div>
                <div className={classes.textInputContainer}>
                  <Typography className={classes.inputLabel}>
                    Append command line
                  </Typography>
                  <OutlinedInput
                    className={classes.textInput}
                    value={settingField.others.enterCommandLine}
                    placeholder="Command line"
                    onChange={(e) =>
                      handleChangeOthersSetting(
                        e.target.value,
                        "enterCommandLine"
                      )
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
                disabled={
                  projectStatus === PROJECT_STATUS.IN_PROCESS ||
                  projectStatus === PROJECT_STATUS.IN_PROCESS_AFTER_CONTINUE ||
                  projectStatus === PROJECT_STATUS.IN_PROCESS_AFTER_RESTART
                }
              >
                Save
              </Button>
              <Button
                variant="outlined"
                className={classes.button2}
                onClick={handleResetSetting}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default React.memo(SettingDetail);
