import {
  Divider,
  Typography,
  Input,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import SettingMenu from "component/SettingMenu/SettingMenu";
import React, { useState } from "react";
import useStyles from "./styles";

function SettingDetail({ handleCloseSetting }) {
  const classes = useStyles();
  const [settingField, setSettingField] = useState({
    data: {
      sequence: "autoDetect",
      codon: null,
    },
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
  };
  const { data } = settingDetail;
  const handleCheckRadio = (e) => {
    setSettingField({ ...settingField, data: { sequence: e.target.value } });
  };
  const handleSelectNavigatorOption = (option) => {
    if (option !== currentOption) setCurrentOption(option);
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
                        checked={settingField.data.sequence === input.value}
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
                          className={classes.radioLabel}
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
        </div>
      </div>
    </div>
  );
}

export default SettingDetail;
