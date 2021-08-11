import InputFile from "component/InputFile/InputFile";
import React from "react";
import useStyles from "./styles";

function ListInputFiles({ listInput }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {listInput &&
        listInput.map((name, index) => <InputFile name={name} key={index} />)}
    </div>
  );
}

export default ListInputFiles;
