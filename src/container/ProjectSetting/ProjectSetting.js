import { Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Setting } from "shared/icons";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");

function ProjectSetting(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [projectName, setProjectName] = useState();
  useEffect(() => {
    ipcRenderer.send("getProjectById", id);
  }, [id]);
  ipcRenderer.on("returnProjectById", (event, data) => {
    const { name } = data[0];
    setProjectName(name);
  });
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.projectSetting}>
          <Typography variant="h5" className={classes.title}>
            {projectName}
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
