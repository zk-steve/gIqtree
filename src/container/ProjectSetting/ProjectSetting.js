import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Setting } from "shared/icons";
import useStyles from "./styles";

function ProjectSetting(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.projectSetting}>
          <Typography variant="h5" className={classes.title}>
            Project Example
          </Typography>
          <div className={classes.setting}>
            <Setting />
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
          >
            Execute
          </Button>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            disabled
          >
            Pause
          </Button>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            disabled
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectSetting;
