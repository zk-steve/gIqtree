import { Typography } from "@material-ui/core";
import clsx from "clsx";
import AlertDialog from "component/AlertDialog/AlertDialog";
import React, { useEffect, useState } from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import useStyles from "./styles";
import { PROJECT_STATUS } from "pages/ProjectPage/ProjectPage";
// import PhylotreeApplication from "@giap/phylotree";
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
}) {
  const classes = useStyles();
  const { id } = useParams();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const handleSelectInput = () => {
    ipcRenderer.send("selectDialog", id);
  };
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

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {/* <Typography variant="h5" className={classes.title}>
          {isInProcess && "Input"}
          {!isInProcess && currentTab === "input" && projectName}
          {!isInProcess && currentTab === "output" && "Output"}
        </Typography> */}
        <Typography className={classes.smallTitle}>
          {(projectStatus === PROJECT_STATUS.IN_PROCESS ||
            projectStatus === PROJECT_STATUS.IN_PROCESS_AFTER_CONTINUE ||
            projectStatus === PROJECT_STATUS.IN_PROCESS_AFTER_RESTART) &&
            "Progression"}
          {projectStatus === PROJECT_STATUS.EXECUTED ||
            (projectStatus === PROJECT_STATUS.NOT_EXECUTED &&
              currentFile !== "" &&
              currentFile)}
        </Typography>
        {
          projectStatus === PROJECT_STATUS.EXECUTED ||
          (projectStatus === PROJECT_STATUS.NOT_EXECUTED &&
            outputContent !== "" &&
            currentFile.split(".")[1] !== "treefile") ? (
            <textarea
              readOnly
              className={classes.outputContent}
              value={outputContent}
            />
          ) : null
          // <PhylotreeApplication
          //   newick={outputContent}
          //   support={"aa/bb/cc/dd"}
          //   width={500}
          //   height={500}
          // />
        }
        {/* {!isInProcess &&
          outputContent !== "" &&
          ["bionj", "treefile"].includes(currentFile.split(".")[1]) && (
            <div className={classes.outputContent}>
              <TreeView content={outputContent} />
            </div>
          )} */}
        {(currentFile === "" ||
          projectStatus === PROJECT_STATUS.EXECUTED ||
          projectStatus === PROJECT_STATUS.NOT_EXECUTED) && (
          <div className={classes.inputContainer}>
            {/* {listInput.length === 0 && (
              <div className={classes.input} onClick={handleSelectInput}>
                <InputFileIcon />
                <div className={classes.textContainer}>
                  <Typography className={classes.smallText} component="p">
                    Browse
                  </Typography>
                  &nbsp;
                  <Typography className={classes.browse} component="p">
                    to choose a file
                  </Typography>
                </div>
              </div>
            )} */}
            {projectStatus !== PROJECT_STATUS.EXECUTED &&
              projectStatus !== PROJECT_STATUS.NOT_EXECUTED && (
                /* <CircularProgressbarWithChildren
                    value={progressPercentage}
                    styles={buildStyles({
                      pathTransition: "0.25s ease",
                      pathColor: "#DC3A61",
                    })}
                  >
                    <Typography>{progressPercentage}%</Typography>
                  </CircularProgressbarWithChildren> */
                <textarea
                  readOnly
                  value={progressLog ? progressLog : ""}
                  className={classes.progressContent}
                />
              )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectInput;
