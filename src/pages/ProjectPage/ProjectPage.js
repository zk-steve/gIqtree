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

function ProjectPage(props) {
  const classes = useStyles();
  const { handleShowAlert } = useContext(DialogContext);

  const projectPath = useRef(null);
  const [currentTab, setCurrentTab] = useState("input");
  const [currentFile, setCurrentFile] = useState("");
  const [isSettingOpen, setIsSettingOpen] = useState(true);
  const [listTrees, setListTrees] = useState([]);
  const [isExecuteDisabled, setIsExecuteDisabled] = useState(true);
  const [isPauseDisabled, setIsPauseDisabled] = useState(true);
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const [isInProcess, setIsInProcess] = useState(false);
  const [isDoneProcess, setIsDoneProcess] = useState(false);
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
      data = JSON.parse(data)
      processId.current = data.processId;
      handleGetProjectProgress();
    };
    const getProgressResult = (event, data) => {
      if (data.status === 1) {
        if (data.doneStatus === 1) {
          clearInterval(progress.current);
          setIsDoneProcess(true);
        } else {
          setProgressLog(data.data);
          console.log(data);
        }
      }
    };
    const pauseResult = (event, data) => {
      console.log(data);
    };
    ipcRenderer.on("returnProjectById", returnProjectById);
    ipcRenderer.on("viewFileData", viewFileData);
    ipcRenderer.on("saveSettingResult", saveSettingResult);
    ipcRenderer.on("testSettingResult", (event, data) => {});
    ipcRenderer.on("executeResult", executeResult);
    ipcRenderer.on("getProgressResult", getProgressResult);
    ipcRenderer.on("pauseResult", pauseResult);

    return () => {
      ipcRenderer.removeListener("returnProjectById", returnProjectById);
      ipcRenderer.removeListener("saveSettingResult", saveSettingResult);
      clearInterval(progress.current);
    };
  }, [id]); //get list input and get project name
  // useEffect(() => {
  //   if (listInput.length > 0) setIsExecuteDisabled(false);
  //   else setIsExecuteDisabled(true);
  //   if (listOutput.length > 0) {
  //     setIsPauseDisabled(true);
  //     setIsInProcess(false);
  //     setIsDoneProcess(true);
  //   }
  // }, [listInput, listOutput]); //change button status
  const handleOpenSetting = () => {
    if (!isSettingOpen) setIsSettingOpen(true);
    if (currentFile !== "") setCurrentFile("");
  };
  const handleCloseSetting = () => {
    setIsSettingOpen(false);
  };
  const handleExecute = () => {
    ipcRenderer.invoke("executeProject", projectPath.current);
    setIsExecuteDisabled(true);
    setIsPauseDisabled(false);
    setIsInProcess(true);
    setIsSettingOpen(false);
    // handleGetProjectProgress();
  };
  // const handleSetListInput = (data) => {
  //   setListInput([...data]);
  // };
  // const handleDeleteInput = (name) => {
  //   const newListInput = listInput.filter((input) => input.name !== name);
  //   setListInput(newListInput);
  // };
  // const handleSetListOutput = (data) => {
  //   setListOutput([...data]);
  // };
  const handlePauseProject = () => {
    ipcRenderer.send("pauseProject", processId.current);
    console.log(processId.current);
    setIsPauseDisabled(true);
    setIsContinueDisabled(false);
  };
  const handleContinueProject = () => {
    ipcRenderer.invoke("continueProject", projectPath.current);
  };
  const handleGetOutputContent = (path) => {
    ipcRenderer.send("viewFile", path);
  };
  const handleChangeTab = (tab) => {
    if (currentTab !== tab) setCurrentTab(tab);
    // if (tab === "output" && currentFile === "") {
    //   handleGetOutputContent(listOutput[0]);
    // }
  };
  const handleSelectInputTab = () => {
    handleChangeTab("input");
    setCurrentFile("");
    setOutputContent("");
  };
  const handleGetProjectProgress = () => {
    progress.current = setInterval(() => {
      ipcRenderer.invoke("getProgress", projectPath.current);
    }, 2000);
  };
  const handleRestartProject = () => {
    ipcRenderer.invoke("restartProject", projectPath.current);
    setIsExecuteDisabled(true);
    setIsPauseDisabled(false);
    setIsInProcess(true);
  };
  const handleTestSetting = (setting) => {
    ipcRenderer.invoke("testSetting", id, setting);
  };
  return (
    <div className={classes.root}>
      <ProjectSetting
        handleOpenSetting={handleOpenSetting}
        handleExecute={handleExecute}
        isExecuteDisabled={isExecuteDisabled}
        isContinueDisabled={isContinueDisabled}
        isPauseDisabled={isPauseDisabled}
        isInProcess={isInProcess}
        isDoneProcess={isDoneProcess}
        projectName={projectName}
        handlePauseProject={handlePauseProject}
        handleRestartProject={handleRestartProject}
        handleContinueProject={handleContinueProject}
      />
      <Divider variant="fullWidth" />
      <div className={classes.container}>
        <div className={classes.main}>
          <FolderTree
            // listOutput={listOutput}
            // handleSetListOutput={handleSetListOutput}
            // listInput={listInput}
            // handleSetListInput={handleSetListInput}
            // handleDeleteInput={handleDeleteInput}
            listTrees={listTrees}
            setIsInProcess={setIsInProcess}
            isDoneProcess={isDoneProcess}
            handleGetOutputContent={handleGetOutputContent}
            currentTab={currentTab}
            handleChangeTab={handleChangeTab}
            currentFile={currentFile}
            handleSelectInputTab={handleSelectInputTab}
          />
          <Divider orientation="vertical" className={classes.divider} />
          {!isSettingOpen && (
            <ProjectInput
              // listInput={listInput}
              // handleSetListInput={handleSetListInput}
              // handleDeleteInput={handleDeleteInput}
              isInProcess={isInProcess}
              projectName={projectName}
              outputContent={outputContent}
              currentTab={currentTab}
              currentFile={currentFile}
              progressLog={progressLog}
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
