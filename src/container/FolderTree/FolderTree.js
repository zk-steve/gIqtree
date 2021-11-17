import { Typography } from "@material-ui/core";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import React, { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import CloseFile from "shared/icons/closeFile";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");

function FolderTree({
  handleSetListOutput,
  handleSetListInput,
  handleDeleteInput,
  setIsInProcess,
  handleGetOutputContent,
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
    ipcRenderer.once("selectFile", selectFile);
    ipcRenderer.once("deleteResult", deleteResult);
    return () => {
      ipcRenderer.removeListener("selectFile", selectFile);
      ipcRenderer.removeListener("deleteResult", deleteResult);
    };
  }, [
    handleDeleteInput,
    handleSetListInput,
    handleSetListOutput,
    setIsInProcess,
  ]);
  const CustomTree = ({ name, isFile, ...props }) => {
    return (
      <TreeItem
        {...props}
        label={
          <div className={classes.treeFile}>
            <Typography variant="body1">{name}</Typography>
          </div>
        }
        className={classes.treeContent}
      />
    );
  };
  const renderTree = (nodes) =>
    nodes.name !== "setting.json" && (
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
