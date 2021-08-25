import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { SmallFile } from "shared/icons";
import CloseFile from "shared/icons/closeFile";
import useStyles from "./styles";

function InputFile({ name, onDeleteFile }) {
  const classes = useStyles();
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const handleHover = (e) => {
    setShowDeleteIcon(!showDeleteIcon);
  };
  const handleDeleteFile = () => {
    onDeleteFile(name);
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
