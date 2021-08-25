import InputFile from "component/InputFile/InputFile";
import React from "react";
import useStyles from "./styles";

function ListInputFiles({ listInput, onDeleteFile }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {listInput.length > 0 &&
        listInput.map((name, index) => (
          <InputFile name={name.name} key={index} onDeleteFile={onDeleteFile} />
        ))}
    </div>
  );
}

export default ListInputFiles;
