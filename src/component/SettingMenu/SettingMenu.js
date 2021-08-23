import { Typography } from "@material-ui/core";
import React from "react";
import { SettingClose } from "shared/icons";
import useStyles from "./styles";

function SettingMenu(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.settingTitle}>
          <Typography>Setting</Typography>
          <SettingClose />
        </div>
        <div>
          <div className={classes.settingOption}>
            <Typography>Data</Typography>
          </div>
          <div className={classes.settingOption}>
            <Typography>Model</Typography>
          </div>
          <div className={classes.settingOption}>
            <Typography>Tree Search</Typography>
          </div>
          <div className={classes.settingOption}>
            <Typography>Assessment</Typography>
          </div>
          <div className={classes.settingOption}>
            <Typography>Dating</Typography>
          </div>
          <div className={classes.settingOption}>
            <Typography>Others</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingMenu;
