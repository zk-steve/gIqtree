import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Setting } from "shared/icons";
import useStyles from "./styles";
import { PROJECT_STATUS } from "pages/ProjectPage/ProjectPage";
function ProjectSetting({
  handleOpenSetting,
  isExecuteDisabled,
  isContinueDisabled,
  isPauseDisabled,
  projectName,
  projectStatus,
  handleSetProjectStatus,
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
            onClick={
              projectStatus === PROJECT_STATUS.EXECUTED
                ? () =>
                    handleSetProjectStatus(
                      PROJECT_STATUS.IN_PROCESS_AFTER_RESTART
                    )
                : () => handleSetProjectStatus(PROJECT_STATUS.IN_PROCESS)
            }
            disabled={isExecuteDisabled}
          >
            {projectStatus === PROJECT_STATUS.EXECUTED ? "Restart" : "Execute"}
          </Button>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            disabled={isPauseDisabled}
            onClick={() => handleSetProjectStatus(PROJECT_STATUS.IS_PAUSED)}
          >
            Pause
          </Button>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            disabled={isContinueDisabled}
            onClick={() =>
              handleSetProjectStatus(PROJECT_STATUS.IN_PROCESS_AFTER_CONTINUE)
            }
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectSetting;
