import { Typography } from "@material-ui/core";
import React from "react";
import { SmallFile } from "shared/icons";
import CloseFile from "shared/icons/closeFile";
import useStyles from "./styles";

function InputFile(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SmallFile className={classes.fileIcon} />
      <Typography component="span">Xử lí gen động vật.MSA</Typography>
      <CloseFile className={classes.closeIcon} />
    </div>
  );
}

export default InputFile;
