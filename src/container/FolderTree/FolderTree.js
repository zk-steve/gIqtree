import { Typography } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect } from "react";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");

function FolderTree({
  listOutput,
  handleSetListOutput,
  listInput,
  handleSetListInput,
  handleDeleteInput,
  setIsInProcess,
  isDoneProcess,
  handleGetOutputContent,
  currentTab,
  handleChangeTab,
  currentFile,
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
      setIsInProcess(false);
    };
    ipcRenderer.once("selectFile", selectFile);
    ipcRenderer.once("deleteResult", deleteResult);
    ipcRenderer.once("executeResult", executeResult);
    return () => {
      ipcRenderer.removeListener("selectFile", selectFile);
      ipcRenderer.removeListener("deleteResult", deleteResult);
      ipcRenderer.removeListener("executeResult", executeResult);
    };
  }, [
    handleDeleteInput,
    handleSetListInput,
    handleSetListOutput,
    setIsInProcess,
  ]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.inputAndOutputContainer}>
          <Typography
            className={clsx({
              [classes.title]: true,
              [classes.isCurrentTab]: currentTab === "input",
            })}
            onClick={() => handleChangeTab("input")}
          >
            Input
          </Typography>
          {listInput.length > 0 &&
            listInput.map((name, index) => (
              <Typography className={classes.fileName} key={index}>
                {name.name}
              </Typography>
            ))}
        </div>
        {isDoneProcess && (
          <div className={classes.inputAndOutputContainer}>
            <Typography
              className={clsx({
                [classes.title]: true,
                [classes.isCurrentTab]: currentTab === "output",
              })}
              onClick={() => handleChangeTab("output")}
            >
              Output
            </Typography>
            {listOutput.length > 0 &&
              listOutput.map((name, index) => (
                <Typography
                  className={clsx({
                    [classes.fileName]: true,
                    [classes.isCurrentFile]: name.name === currentFile,
                  })}
                  key={index}
                  onClick={() => {
                    handleGetOutputContent(name);
                    handleChangeTab("output");
                  }}
                >
                  {name.name}
                </Typography>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FolderTree;
