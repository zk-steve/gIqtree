import { Typography } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { Rnd } from "react-rnd";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseFile from "shared/icons/closeFile";
const { ipcRenderer } = window.require("electron");

function FolderTree({
  handleSetListOutput,
  handleSetListInput,
  handleDeleteInput,
  setIsInProcess,
  isDoneProcess,
  handleGetOutputContent,
  currentTab,
  handleChangeTab,
  currentFile,
  handleSelectInputTab,
  listTrees,
}) {
  const maxWidth = window.innerWidth / 5;
  const [size, setSize] = useState(210);
  const classes = useStyles({ width: size });
  useEffect(() => {
    const selectFile = (event, data) => {
      const { message, status } = data;
      if (status === 1) handleSetListInput(message);
    };
    const deleteResult = (event, response) => {
      const { name, status } = response;
      if (status === 1) {
        handleDeleteInput(name);
      }
    };
    const executeResult = (event, data) => {
      const { message, status } = data;
      if (status === 1) {
        handleSetListOutput(message);
        setIsInProcess(false);
      }
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
  const CustomTree = ({ name, isFile, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    const handleDeleteFile = (path) => {};
    return (
      <TreeItem
        {...props}
        label={
          <div
            className={classes.treeFile}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
          >
            <Typography variant="body1">{name}</Typography>
            {isFile && isVisible && <CloseFile />}
          </div>
        }
        className={classes.treeContent}
      />
    );
  };
  const renderTree = (nodes) => (
    <CustomTree
      name={nodes.name}
      isFile={!Boolean(nodes.children)}
      nodeId={nodes.path}
    >
      {nodes.children && nodes.children.length > 0
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </CustomTree>
  );
  return (
    <div className={classes.root} style={{ width: `${size}px` }}>
      <Rnd
        size={{ width: "100%", height: "100%" }}
        disableDragging={true}
        onResize={(e, direction, ref, delta, position) => {
          setSize(ref.offsetWidth);
        }}
        maxWidth={maxWidth}
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
            {/* <Typography
              className={clsx({
                [classes.title]: true,
                [classes.isCurrentTab]: currentTab === "input",
              })}
              onClick={handleSelectInputTab}
            >
              Input
            </Typography> */}
            {/* {listInput.length > 0 &&
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
              ))} */}
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                height: "100%",
                flexGrow: 1,
                width: "100%",
              }}
              onNodeSelect={(node, path) => {
                handleGetOutputContent(path);
              }}
            >
              {listTrees.length > 0 &&
                listTrees.map((tree, index) => renderTree(tree))}
            </TreeView>
          </div>
          {/* {isDoneProcess && (
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
                      handleChangeTab("output");
                      handleGetOutputContent(name);
                    }}
                  >
                    {name.name}
                  </Typography>
                ))}
            </div>
          )} */}
        </div>
      </Rnd>
    </div>
  );
}

export default FolderTree;
