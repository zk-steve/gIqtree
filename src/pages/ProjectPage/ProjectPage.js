import { Divider } from "@material-ui/core";
import FolderTree from "container/FolderTree/FolderTree";
import ProjectInput from "container/ProjectInput/ProjectInput";
import ProjectSetting from "container/ProjectSetting/ProjectSetting";
import SettingDetail from "container/SettingDetail/SettingDetail";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");

function ProjectPage(props) {
  const classes = useStyles();
  const [projectPath, setProjectPath] = useState(null);
  const [currentTab, setCurrentTab] = useState("input");
  const [currentFile, setCurrentFile] = useState("");
  const [isSettingOpen, setIsSettingOpen] = useState(true);
  const [listTrees, setListTrees] = useState([]);
  const [isExecuteDisabled, setIsExecuteDisabled] = useState(true);
  const [isPauseDisabled, setIsPauseDisabled] = useState(true);
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const [isInProcess, setIsInProcess] = useState(false);
  const [isDoneProcess, setIsDoneProcess] = useState(false);
  const [outputContent, setOutputContent] = useState("");
  const { id } = useParams();
  const [projectName, setProjectName] = useState();
  const [projectSetting, setProjectSetting] = useState(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [progressInterval, setProgressInterval] = useState(null);
  useEffect(() => {
    ipcRenderer.send("getProjectById", id);
    const viewFileData = (event, data) => {
      const { message, status } = data;
      if (status === 1) setOutputContent(message);
    };
    const progressResult = (event, data) => {
      const { status, message } = data;
      if (status === 1) {
        setProgressPercentage(message);
      }
    };
    const saveSettingResult = (event, data) => {
      const { status, message } = data;
      console.log(data);
      if (status === 1) {
        // setProjectSetting(message);
        ipcRenderer.send("getProjectById", id);
      }
    };
    const returnProjectById = (event, data) => {
      const { message, status } = data;
      console.log(data);
      if (status === 1) {
        setProjectName(message.projectDetail.name);
        setProjectSetting(message.objectModel);
        setProjectPath(message.projectDetail.path);
        setListTrees(message.projectDetail.children);
        // if (message.tree.input.length > 0)
        //   handleSetListInput(message.tree.input);
        // if (message.tree.output.length > 0)
        //   handleSetListOutput(message.tree.output);
      }
    };
    ipcRenderer.on("returnProjectById", returnProjectById);
    ipcRenderer.on("progressResult", progressResult);
    ipcRenderer.on("viewFileData", viewFileData);
    ipcRenderer.on("saveSettingResult", saveSettingResult);
    ipcRenderer.on("testSettingResult", (event, data) => {});
    return () => {
      ipcRenderer.removeListener("returnProjectById", returnProjectById);
      ipcRenderer.removeListener("saveSettingResult", saveSettingResult);
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
  useEffect(() => {
    if (!isInProcess) {
      clearInterval(progressInterval);
      setProgressPercentage(0);
    }
  }, [isInProcess, progressInterval]);
  const handleOpenSetting = () => {
    if (!isSettingOpen) setIsSettingOpen(true);
    if (currentFile !== "") setCurrentFile("");
  };
  const handleCloseSetting = () => {
    setIsSettingOpen(false);
  };
  const handleExecute = () => {
    ipcRenderer.invoke("executeProject", id);
    setIsExecuteDisabled(true);
    setIsPauseDisabled(false);
    setIsInProcess(true);
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
    setIsPauseDisabled(true);
    setIsContinueDisabled(false);
  };
  const handleGetOutputContent = (path, name) => {
    ipcRenderer.send("viewFile", path);
    setCurrentFile(name);
    if (isSettingOpen) setIsSettingOpen(false);
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
    let getProgress = setInterval(() => {
      ipcRenderer.invoke("progressProject", id);
    }, 1000);
    setProgressInterval(getProgress);
  };
  const handleRestartProject = () => {
    ipcRenderer.invoke("restart", id);
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
              progressPercentage={progressPercentage}
            />
          )}
          {isSettingOpen && projectSetting && (
            <SettingDetail
              id={id}
              projectPath={projectPath}
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
