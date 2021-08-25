import { Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { SettingClose } from "shared/icons";
import useStyles from "./styles";

function SettingMenu({
  currentOption,
  handleSelectNavigatorOption,
  handleCloseSetting,
}) {
  const classes = useStyles();
  const listOption = [
    { option: "Data", value: "data" },
    { option: "Model", value: "model" },
    { option: "Tree Search", value: "tree" },
    { option: "Assessment", value: "assessment" },
    { option: "Dating", value: "dating" },
    { option: "Others", value: "others" },
  ];
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.settingTitle}>
          <Typography>Setting</Typography>
          <SettingClose onClick={handleCloseSetting} />
        </div>
        <div>
          {listOption.map((option, index) => (
            <div
              className={clsx({
                [classes.settingOption]: true,
                [classes.onSelect]: option.value === currentOption,
              })}
              onClick={() => {
                handleSelectNavigatorOption(option.value);
              }}
              key={index}
            >
              <Typography>{option.option}</Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SettingMenu;
