import InputFile from "component/InputFile/InputFile";
import React from "react";
import useStyles from "./styles";

function ListInputFiles({ listInput, onDeleteFile, listId }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {listInput &&
        listInput.map((name, index) => (
          <InputFile
            name={name}
            key={index}
            onDeleteFile={onDeleteFile}
            id={listId[index]}
          />
        ))}
    </div>
  );
}

export default ListInputFiles;
