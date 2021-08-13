import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { SmallFile } from "shared/icons";
import CloseFile from "shared/icons/closeFile";
import useStyles from "./styles";

function InputFile({ name, onDeleteFile, id }) {
  console.log(id);
  const classes = useStyles();
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const handleHover = (e) => {
    setShowDeleteIcon(!showDeleteIcon);
  };
  const handleDeleteFile = () => {
    onDeleteFile(id[0]);
  };
  return (
    <div
      className={classes.root}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <SmallFile className={classes.fileIcon} />
      <Typography component="span">{name}</Typography>
      {showDeleteIcon && (
        <CloseFile className={classes.closeIcon} onClick={handleDeleteFile} />
      )}
    </div>
  );
}

export default InputFile;
