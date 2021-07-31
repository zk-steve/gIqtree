import { Typography } from "@material-ui/core";
import React from "react";
import { InputFile } from "shared/icons";
import useStyles from "./styles";

function ProjectInput(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          Input
        </Typography>
        <Typography>Select MSA file</Typography>
        <div className={classes.inputContainer}>
          <div className={classes.input}>
            <InputFile />
            <Typography className={classes.browse} component="p">
              Browse to choose a file
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectInput;
