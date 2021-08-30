import { Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Setting } from "shared/icons";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");

function ProjectSetting({
  handleOpenSetting,
  handleExecute,
  isExecuteDisabled,
  isContinueDisabled,
  isPauseDisabled,
}) {
  const classes = useStyles();
  const { id } = useParams();
  const [projectName, setProjectName] = useState();
  useEffect(() => {
    ipcRenderer.send("getProjectById", id);
    ipcRenderer.once("returnProjectById", (event, data) => {
      const { name } = data[0];
      setProjectName(name);
    });
  }, [id]);

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
            onClick={() => handleExecute(id)}
            disabled={isExecuteDisabled}
          >
            Execute
          </Button>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            disabled={isPauseDisabled}
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
