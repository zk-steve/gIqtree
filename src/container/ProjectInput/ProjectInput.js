import PhylotreeApplication from "@giap/phylotree";
import { Link, Typography } from "@material-ui/core";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import { PROJECT_STATUS } from "pages/ProjectPage/ProjectPage";
import React, { useEffect, useState, useRef } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import { getFileExtension } from "utils";
import { TREE_EXTENSION } from "utils/constant";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");

function ProjectInput({
  handleSetListInput,
  handleDeleteInput,
  projectStatus,
  projectName,
  outputContent,
  currentTab,
  currentFile,
  progressLog,
  projectSetting,
  currentTree,
  setCurrentTree,
  currentTreeContent,
}) {
  const classes = useStyles();
  const { id } = useParams();
  const numberOfTree = outputContent?.split(";").length;
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [overrideTreeView, setOverrideTreeView] = useState(false);

  const formRef = useRef(null);

  const { assessment } = projectSetting;
  const isTree = TREE_EXTENSION.includes(getFileExtension(currentFile));
  const treeSupport = `${
    assessment.bootstrapMethod !== "none"
      ? assessment.bootstrapMethod === "ufboot"
        ? "UFBoot"
        : "SBS"
      : ""
  }${assessment.singleBranchTest.parametric ? "/aLRT" : ""}${
    assessment.singleBranchTest.SHlike ? "/SH-aLRT" : ""
  }${assessment.singleBranchTest.aBayes ? "/aBayes" : ""}${
    assessment.singleBranchTest.localBootstrap ? "/LBP" : ""
  }`;

  useEffect(() => {
    const selectFile = (event, data) => {
      const { message, status } = data;
      if (status === 1) {
        handleSetListInput(message);
      } else setIsOpenAlert(true);
    };
    const deleteResult = (event, response) => {
      const { status } = response;
      if (status === 1) {
        const { name } = response;
        handleDeleteInput(name);
      } else console.log(status);
    };
    ipcRenderer.on("selectFile", selectFile);
    ipcRenderer.on("deleteResult", deleteResult);
    return () => {
      ipcRenderer.removeListener("selectFile", selectFile);
      ipcRenderer.removeListener("deleteResult", deleteResult);
    };
  }, [handleDeleteInput, handleSetListInput]);
  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };
  const handleDeleteFile = (name) => {
    const data = { input_name: name, project_id: id };
    ipcRenderer.send("deleteInput", data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      e.target.treeIndex.value > 0 &&
      e.target.treeIndex.value < outputContent.split(";").length
    ) {
      setCurrentTree(e.target.treeIndex.value);
      e.target.treeIndex.blur();
    }
  };
  const onArrowUp = () => {
    if (currentTree < numberOfTree - 1) {
      formRef.current.treeIndex.value = currentTree + 1;
      setCurrentTree(currentTree + 1);
    }
  };
  const onArrowDown = () => {
    if (currentTree > 1) {
      formRef.current.treeIndex.value = parseInt(currentTree) - 1;
      setCurrentTree(currentTree - 1);
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography className={classes.smallTitle}>
          {(projectStatus === PROJECT_STATUS.IN_PROCESS ||
            projectStatus === PROJECT_STATUS.IN_PROCESS_AFTER_CONTINUE ||
            projectStatus === PROJECT_STATUS.IN_PROCESS_AFTER_RESTART) &&
            "In progress..."}
          {progressLog &&
            !currentFile &&
            projectStatus === PROJECT_STATUS.EXECUTED &&
            "Done"}
          {currentFile !== "" && currentFile}
        </Typography>
        {numberOfTree >= 3 && isTree && (
          <>
            <form
              className={classes.treeIndexInput}
              onSubmit={onSubmit}
              ref={formRef}
            >
              <Typography>Tree index:</Typography>
              <input defaultValue={currentTree} name="treeIndex" />
              &nbsp; /&nbsp;{numberOfTree - 1}
              <div
                className={classes.arrow}
                style={{ marginLeft: "12px" }}
                onClick={onArrowUp}
              >
                <KeyboardArrowUpRounded />
              </div>
              <div
                className={classes.arrow}
                style={{ marginLeft: "4px" }}
                onClick={onArrowDown}
              >
                <KeyboardArrowDownRounded />
              </div>
            </form>
            <Typography>
              <Link
                color="inherit"
                onClick={() => setOverrideTreeView(!overrideTreeView)}
              >
                <b style={{ cursor: "pointer" }}>
                  Tree view is {overrideTreeView ? "disabled" : "enabled"}.
                  Click here to toggle.
                </b>
              </Link>
            </Typography>
          </>
        )}
        {currentFile &&
          outputContent !== "" &&
          (!isTree || overrideTreeView) && (
            <textarea
              readOnly
              className={classes.outputContent}
              value={outputContent}
            />
          )}
        {currentTreeContent !== "" && isTree && !overrideTreeView && (
          <PhylotreeApplication
            newick={currentTreeContent && currentTreeContent}
            support={
              getFileExtension(currentFile) === ".treefile" ? treeSupport : ""
            }
            width={600}
            height={500}
          />
        )}
        {/* {!isInProcess &&
          outputContent !== "" &&
          ["bionj", "treefile"].includes(currentFile.split(".")[1]) && (
            <div className={classes.outputContent}>
              <TreeView content={outputContent} />
            </div>
          )} */}
        {currentFile === "" && progressLog && (
          /* <CircularProgressbarWithChildren
                    value={progressPercentage}
                    styles={buildStyles({
                      pathTransition: "0.25s ease",
                      pathColor: "#DC3A61",
                    })}
                  >
                    <Typography>{progressPercentage}%</Typography>
                  </CircularProgressbarWithChildren> */
          <ScrollToBottom mode="bottom" className={classes.progressContent}>
            {progressLog ? progressLog : ""}
          </ScrollToBottom>
        )}
      </div>
    </div>
  );
}

export default ProjectInput;
