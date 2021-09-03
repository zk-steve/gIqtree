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
  const [currentTab, setCurrentTab] = useState("input");
  const [currentFile, setCurrentFile] = useState("");
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [listInput, setListInput] = useState([]);
  const [listOutput, setListOutput] = useState([]);
  const [isExecuteDisabled, setIsExecuteDisabled] = useState(true);
  const [isPauseDisabled, setIsPauseDisabled] = useState(true);
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const [isInProcess, setIsInProcess] = useState(false);
  const [isDoneProcess, setIsDoneProcess] = useState(false);
  const [outputContent, setOutputContent] = useState("");
  const { id } = useParams();
  const [projectName, setProjectName] = useState();
  useEffect(() => {
    ipcRenderer.send("getProjectById", id);
    ipcRenderer.send("getInputByProject", id);
    const getProjectInput = (event, data) => {
      const { status, message } = data;
      if (status === 1) handleSetListInput(message);
    };
    const viewFileData = (event, data) => {
      setOutputContent(data);
    };
    ipcRenderer.once("returnProjectById", (event, data) => {
      const { name } = data[0];
      setProjectName(name);
    });
    ipcRenderer.on("inputsOfProject", getProjectInput);
    ipcRenderer.on("viewFileData", viewFileData);
  }, [id]); //get list input and get project name
  useEffect(() => {
    if (listInput.length > 0) setIsExecuteDisabled(false);
    else setIsExecuteDisabled(true);
    if (listOutput.length > 0) {
      setIsPauseDisabled(true);
      setIsInProcess(false);
      setIsDoneProcess(true);
    }
  }, [listInput, listOutput]); //change button status
  const handleOpenSetting = () => {
    if (!isSettingOpen) setIsSettingOpen(true);
  };
  const handleCloseSetting = () => {
    setIsSettingOpen(false);
  };
  const handleExecute = () => {
    ipcRenderer.invoke("executeProject", id);
    setIsExecuteDisabled(true);
    setIsPauseDisabled(false);
    setIsInProcess(true);
  };
  const handleSetListInput = (data) => {
    setListInput([...data]);
  };
  const handleDeleteInput = (name) => {
    const newListInput = listInput.filter((input) => input.name !== name);
    setListInput(newListInput);
  };
  const handleSetListOutput = (data) => {
    setListOutput([...data]);
  };
  const handlePauseProject = () => {
    setIsPauseDisabled(true);
    setIsContinueDisabled(false);
  };
  const handleGetOutputContent = (file) => {
    ipcRenderer.send("viewFile", file.path);
    setCurrentFile(file.name);
  };
  const handleChangeTab = (tab) => {
    if (currentTab !== tab) setCurrentTab(tab);
    if (tab === "output" && currentFile === "") {
      handleGetOutputContent(listOutput[0]);
    }
  };
  const handleSelectInputTab = () => {
    handleChangeTab("input");
    setCurrentFile("");
    setOutputContent("");
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
      />
      <Divider variant="fullWidth" />
      <div className={classes.container}>
        <div className={classes.main}>
          <FolderTree
            listOutput={listOutput}
            handleSetListOutput={handleSetListOutput}
            listInput={listInput}
            handleSetListInput={handleSetListInput}
            handleDeleteInput={handleDeleteInput}
            setIsInProcess={setIsInProcess}
            isDoneProcess={isDoneProcess}
            handleGetOutputContent={handleGetOutputContent}
            currentTab={currentTab}
            handleChangeTab={handleChangeTab}
            currentFile={currentFile}
            handleSelectInputTab={handleSelectInputTab}
          />
          <Divider orientation="vertical" variant="fullWidth" />
          {!isSettingOpen && (
            <ProjectInput
              listInput={listInput}
              handleSetListInput={handleSetListInput}
              handleDeleteInput={handleDeleteInput}
              isInProcess={isInProcess}
              projectName={projectName}
              outputContent={outputContent}
              currentTab={currentTab}
              currentFile={currentFile}
            />
          )}
          {isSettingOpen && (
            <SettingDetail
              handleCloseSetting={handleCloseSetting}
              multiPartition={listInput.length > 1}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
