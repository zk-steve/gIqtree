import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");

function FolderTree({
  listOutput,
  handleSetListOutput,
  listInput,
  handleSetListInput,
  handleDeleteInput,
}) {
  const classes = useStyles();
  useEffect(() => {
    const selectFile = (event, data) => {
      const { message } = data;
      if (Array.isArray(message)) handleSetListInput(message);
    };
    const deleteResult = (event, response) => {
      const { name, status } = response;
      if (status === 1) {
        handleDeleteInput(name);
      }
    };
    const executeResult = (event, data) => {
      handleSetListOutput(data);
    };
    ipcRenderer.once("selectFile", selectFile);
    ipcRenderer.once("deleteResult", deleteResult);
    ipcRenderer.once("executeResult", executeResult);
    return () => {
      ipcRenderer.removeListener("selectFile", selectFile);
      ipcRenderer.removeListener("deleteResult", deleteResult);
      ipcRenderer.removeListener("executeResult", executeResult);
    };
  }, [handleDeleteInput, handleSetListInput, handleSetListOutput]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.inputAndOutputContainer}>
          <Typography className={classes.title}>Input</Typography>
          {listInput.length > 0 &&
            listInput.map((name, index) => (
              <Typography className={classes.fileName} key={index}>
                {name.name}
              </Typography>
            ))}
        </div>
        <div className={classes.inputAndOutputContainer}>
          <Typography className={classes.title}>Output</Typography>
          {listOutput.length > 0 &&
            listOutput.map((name, index) => (
              <Typography className={classes.fileName} key={index}>
                {name.name}
              </Typography>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FolderTree;
