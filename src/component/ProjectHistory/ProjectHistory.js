import { Typography } from "@material-ui/core";
import React from "react";
import { File } from "shared/icons";
import useStyles from "./styles";

function ProjectHistory({ projectName, status, percent, time }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.fileIcon}>
          <File />
        </div>
        <div className={classes.project}>
          <Typography>{projectName}</Typography>
          <Typography variant="caption">
            {status === "processing" ? "Processed" : "Done"} {percent}%
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
