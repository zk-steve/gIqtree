import { Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

function FolderTree(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.inputAndOutputContainer}>
          <Typography className={classes.title} color="secondary">
            INPUT
          </Typography>
        </div>
        <div className={classes.inputAndOutputContainer}>
          <Typography className={classes.title} color="secondary">
            OUTPUT
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default FolderTree;
