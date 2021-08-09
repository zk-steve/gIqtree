import InputFile from "component/InputFile/InputFile";
import React from "react";
import useStyles from "./styles";

function ListInputFiles(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <InputFile />
      <InputFile />
      <InputFile />
    </div>
  );
}

export default ListInputFiles;
