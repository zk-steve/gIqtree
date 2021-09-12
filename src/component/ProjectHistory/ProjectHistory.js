import { Typography } from "@material-ui/core";
import React from "react";
import { File } from "shared/icons";
import useStyles from "./styles";

function ProjectHistory({ projectName, percent, time, onClick }) {
  const classes = useStyles();
  return (
    <div className={classes.root} onClick={onClick}>
      <div className={classes.container}>
        <div className={classes.fileIcon}>
          <File />
        </div>
        <div className={classes.project}>
          <Typography>{projectName}</Typography>
          <Typography className={classes.progress}>
            {percent < 100 ? `Processed ${percent}%` : `${percent}%`}
          </Typography>
        </div>
        <Typography align="left" className={classes.lastColumn}>
          {time}
        </Typography>
      </div>
    </div>
  );
}

export default ProjectHistory;
