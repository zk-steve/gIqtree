import { Divider } from "@material-ui/core";
import { DialogContext } from "component/AlertDialog/AlertDialog";
import FolderTree from "container/FolderTree/FolderTree";
import ProjectInput from "container/ProjectInput/ProjectInput";
import ProjectSetting from "container/ProjectSetting/ProjectSetting";
import SettingDetail from "container/SettingDetail/SettingDetail";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");
export const PROJECT_STATUS = {
  NOT_EXECUTED: "NOT_EXECUTED",
  IN_PROCESS: "IN_PROCESS",
  IS_PAUSED: "IS_PAUSED",
  IN_PROCESS_AFTER_CONTINUE: "IN_PROCESS_AFTER_CONTINUE",
  IN_PROCESS_AFTER_RESTART: "IN_PROCESS_AFTER_RESTART",
  EXECUTED: "EXECUTED",
};
function ProjectPage(props) {
  const classes = useStyles();
  const { handleShowAlert } = useContext(DialogContext);

  const projectPath = useRef(null);
  const [projectStatus, setProjectStatus] = useState(
    PROJECT_STATUS.NOT_EXECUTED
  );
  const [currentFile, setCurrentFile] = useState("");
  const [isSettingOpen, setIsSettingOpen] = useState(true);
  const [listTrees, setListTrees] = useState([]);
  const [isExecuteDisabled, setIsExecuteDisabled] = useState(true);
  const [isPauseDisabled, setIsPauseDisabled] = useState(true);
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const [outputContent, setOutputContent] = useState(null);
  const { id } = useParams();
  const [projectName, setProjectName] = useState(null);
  const [projectSetting, setProjectSetting] = useState(null);
  const [progressLog, setProgressLog] = useState(0);
  const processId = useRef(null);
  const progress = useRef(null);
  useEffect(() => {
    ipcRenderer.send("getProjectById", id);
    const viewFileData = (event, data) => {
      const { message, status } = data;
      if (status === 1) {
        setOutputContent(message.data);
        setCurrentFile(message.name);
        if (isSettingOpen) setIsSettingOpen(false);
      }
    };
    const saveSettingResult = (event, data) => {
      const { status, message } = data;
      console.log(data);
      if (status === 1) {
        ipcRenderer.send("getProjectById", id);
      }
    };
    const returnProjectById = (event, data) => {
      const { message, status } = data;
      if (status === 1) {
        if (!projectName) setProjectName(message.projectDetail.name);
        setProjectSetting(message.objectModel);
        projectPath.current = message.projectDetail.path;
        setListTrees(message.projectDetail.children);
        if (message.objectModel.data.alignment !== "")
          setIsExecuteDisabled(false);
        else setIsExecuteDisabled(true);
        // if (message.tree.input.length > 0)
        //   handleSetListInput(message.tree.input);
        // if (message.tree.output.length > 0)
        //   handleSetListOutput(message.tree.output);
      }
    };
    const executeResult = (event, data) => {
      data = JSON.parse(data);
      processId.current = data.processId;
      setIsSettingOpen(false);
      handleGetProjectProgress();
    };
    const getProgressResult = (event, data) => {
      if (data.status === 1) {
        setProgressLog(data.data);
        if (data.doneStatus === 1) {
          clearInterval(progress.current);
          progress.current = null;
          console.log(data);
          handleSetProjectStatus(PROJECT_STATUS.EXECUTED);
          setIsSettingOpen(true);
        } else {
          console.log(data);
        }
      }
    };
    const pauseResult = (event, data) => {
      if (data.status === 1) {
        clearInterval(progress.current);
      }
    };
    ipcRenderer.on("returnProjectById", returnProjectById);
    ipcRenderer.on("viewFileData", viewFileData);
    ipcRenderer.on("saveSettingResult", saveSettingResult);
    ipcRenderer.on("testSettingResult", (event, data) => {});
    ipcRenderer.on("executeResult", executeResult);
    ipcRenderer.on("continueProjectResult", executeResult);
    ipcRenderer.on("restartProjectResult", executeResult);
    ipcRenderer.on("getProgressResult", getProgressResult);
    ipcRenderer.on("pauseResult", pauseResult);
    return () => {
      ipcRenderer.removeListener("returnProjectById", returnProjectById);
      ipcRenderer.removeListener("saveSettingResult", saveSettingResult);
      clearInterval(progress.current);
    };
  }, [id]); //get list input and get project name
  const handleOpenSetting = () => {
    if (!isSettingOpen) setIsSettingOpen(true);
    if (currentFile !== "") setCurrentFile("");
  };
  const handleCloseSetting = () => {
    setIsSettingOpen(false);
  };
  const handleGetOutputContent = (path) => {
    ipcRenderer.send("viewFile", path);
  };
  const handleGetProjectProgress = () => {
    progress.current = setInterval(() => {
      ipcRenderer.invoke("getProgress", projectPath.current);
    }, 2000);
  };
  const handleTestSetting = (setting) => {
    ipcRenderer.invoke("testSetting", id, setting);
  };
  const handleSetProjectStatus = (status) => {
    setProjectStatus(status);
    switch (status) {
      case PROJECT_STATUS.IN_PROCESS:
        ipcRenderer.invoke("executeProject", projectPath.current);
        setIsExecuteDisabled(true);
        setIsPauseDisabled(false);
        setIsContinueDisabled(true);
        break;
      case PROJECT_STATUS.IS_PAUSED:
        ipcRenderer.send("pauseProject", processId.current);
        setIsExecuteDisabled(true);
        setIsPauseDisabled(true);
        setIsContinueDisabled(false);
        break;
      case PROJECT_STATUS.IN_PROCESS_AFTER_CONTINUE:
        ipcRenderer.invoke("continueProject", projectPath.current);
        setIsExecuteDisabled(true);
        setIsPauseDisabled(false);
        setIsContinueDisabled(true);
        break;
      case PROJECT_STATUS.EXECUTED:
        ipcRenderer.send("getProjectById", id);
        setIsExecuteDisabled(false);
        setIsPauseDisabled(true);
        setIsContinueDisabled(true);
        break;
      case PROJECT_STATUS.IN_PROCESS_AFTER_RESTART:
        ipcRenderer.invoke("restartProject", projectPath.current);
        setIsExecuteDisabled(true);
        setIsPauseDisabled(false);
        setIsContinueDisabled(true);
        break;
      default:
        console.log("Fail");
        break;
    }
  };
  return (
    <div className={classes.root}>
      <ProjectSetting
        handleOpenSetting={handleOpenSetting}
        isExecuteDisabled={isExecuteDisabled}
        isContinueDisabled={isContinueDisabled}
        isPauseDisabled={isPauseDisabled}
        projectStatus={projectStatus}
        projectName={projectName}
        handleSetProjectStatus={handleSetProjectStatus}
      />
      <Divider variant="fullWidth" />
      <div className={classes.container}>
        <div className={classes.main}>
          <FolderTree
            listTrees={listTrees}
            handleGetOutputContent={handleGetOutputContent}
            currentFile={currentFile}
          />
          <Divider orientation="vertical" className={classes.divider} />
          {!isSettingOpen && (
            <ProjectInput
              projectName={projectName}
              outputContent={outputContent}
              currentFile={currentFile}
              progressLog={progressLog}
              projectStatus={projectStatus}
            />
          )}
          {isSettingOpen && projectSetting && (
            <SettingDetail
              id={id}
              projectPath={projectPath.current}
              handleCloseSetting={handleCloseSetting}
              projectSetting={projectSetting}
              handleTestSetting={handleTestSetting}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
