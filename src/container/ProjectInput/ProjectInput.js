import PhylotreeApplication from "@giap/phylotree";
import { Typography } from "@material-ui/core";
import { PROJECT_STATUS } from "pages/ProjectPage/ProjectPage";
import React, { useEffect, useState } from "react";
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
  const { assessment } = projectSetting;
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
  console.log(currentFile, projectStatus);
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {numberOfTree >= 3 &&
          TREE_EXTENSION.includes(getFileExtension(currentFile)) && (
            <form className={classes.treeIndexInput} onSubmit={onSubmit}>
              <Typography>Tree index:</Typography>
              <input defaultValue={currentTree} name="treeIndex" />
              &nbsp; /&nbsp;{numberOfTree - 1}
            </form>
          )}
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
        {outputContent !== "" &&
          !TREE_EXTENSION.includes(getFileExtension(currentFile)) && (
            <textarea
              readOnly
              className={classes.outputContent}
              value={outputContent}
            />
          )}
        {currentTreeContent !== "" &&
          TREE_EXTENSION.includes(getFileExtension(currentFile)) && (
            <PhylotreeApplication
              newick={currentTreeContent && currentTreeContent}
              support={
                getFileExtension(currentFile) === "treefile" ? treeSupport : ""
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
