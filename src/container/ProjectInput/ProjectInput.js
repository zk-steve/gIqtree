import { Typography } from "@material-ui/core";
import InputFile from "component/InputFile/InputFile";
import ListInputFiles from "container/ListInputFiles/ListInputFiles";
import React from "react";
import { InputFileIcon } from "shared/icons";
import useStyles from "./styles";

function ProjectInput(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          Input
        </Typography>
        <Typography className={classes.smallTitle}>Select MSA file</Typography>
        <div className={classes.inputContainer}>
          <div className={classes.input}>
            <InputFileIcon />
            <div className={classes.textContainer}>
              <Typography className={classes.smallText} component="p">
                Browse
              </Typography>
              &nbsp;
              <Typography className={classes.browse} component="p">
                to choose a file
              </Typography>
            </div>
          </div>
          {/* <ListInputFiles /> */}
        </div>
      </div>
    </div>
  );
}

export default ProjectInput;
