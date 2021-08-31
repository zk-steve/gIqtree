import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Setting } from "shared/icons";
import useStyles from "./styles";

function ProjectSetting({
  handleOpenSetting,
  handleExecute,
  isExecuteDisabled,
  isContinueDisabled,
  isPauseDisabled,
  isInProcess,
  isDoneProcess,
  projectName,
  handlePauseProject,
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.projectSetting}>
          <Typography variant="h5" className={classes.title}>
            {projectName}
          </Typography>
          <div className={classes.setting} onClick={handleOpenSetting}>
            <Setting />
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            onClick={handleExecute}
            disabled={isExecuteDisabled}
          >
            {isDoneProcess ? "Restart" : "Execute"}
          </Button>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            disabled={isPauseDisabled}
            onClick={handlePauseProject}
          >
            Pause
          </Button>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            disabled={isContinueDisabled}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectSetting;
