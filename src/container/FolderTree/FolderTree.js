import { Typography } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { Rnd } from "react-rnd";
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
  handleSelectInputTab,
}) {
  const [size, setSize] = useState(210);
  const classes = useStyles({ width: size });
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
    <div className={classes.root} style={{ width: `${size}px` }}>
      <Rnd
        size={{ width: "100%", height: "100%" }}
        disableDragging={true}
        onResize={(e, direction, ref, delta, position) => {
          setSize(ref.offsetWidth);
          console.log(ref.offsetWidth);
        }}
        maxWidth="310px"
        minWidth="90px"
        enableResizing={{
          left: false,
          right: true,
          bottom: false,
          top: false,
          topLeft: false,
          topRight: false,
          bottomLeft: false,
          bottomRight: false,
        }}
      >
        <div className={classes.container}>
          <div className={classes.inputAndOutputContainer}>
            <Typography
              className={clsx({
                [classes.title]: true,
                [classes.isCurrentTab]: currentTab === "input",
              })}
              onClick={handleSelectInputTab}
            >
              Input
            </Typography>
            {listInput.length > 0 &&
              listInput.map((name, index) => (
                <Typography
                  className={clsx({
                    [classes.fileName]: true,
                    [classes.isCurrentFile]: name.name === currentFile,
                  })}
                  key={index}
                  onClick={() => {
                    handleGetOutputContent(name);
                    handleChangeTab("input");
                  }}
                >
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
      </Rnd>
    </div>
  );
}

export default FolderTree;
