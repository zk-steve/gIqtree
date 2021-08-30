import { Divider } from "@material-ui/core";
import FolderTree from "container/FolderTree/FolderTree";
import ProjectInput from "container/ProjectInput/ProjectInput";
import ProjectSetting from "container/ProjectSetting/ProjectSetting";
import SettingDetail from "container/SettingDetail/SettingDetail";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");

function ProjectPage(props) {
  const classes = useStyles();
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [listInput, setListInput] = useState([]);
  const [listOutput, setListOutput] = useState([]);
  const [isExecuteDisabled, setIsExecuteDisabled] = useState(true);
  const [isPauseDisabled, setIsPauseDisabled] = useState(true);
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  useEffect(() => {
    if (listInput.length > 0) setIsExecuteDisabled(false);
    else setIsExecuteDisabled(true);
  }, [listInput]);
  const handleOpenSetting = () => {
    if (!isSettingOpen) setIsSettingOpen(true);
  };
  const handleCloseSetting = () => {
    setIsSettingOpen(false);
  };
  const handleExecute = (id) => {
    console.log(id);
    ipcRenderer.invoke("executeProject", id);
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
  return (
    <div className={classes.root}>
      <ProjectSetting
        handleOpenSetting={handleOpenSetting}
        handleExecute={handleExecute}
        isExecuteDisabled={isExecuteDisabled}
        isContinueDisabled={isContinueDisabled}
        isPauseDisabled={isPauseDisabled}
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
          />
          <Divider orientation="vertical" variant="fullWidth" />
          {!isSettingOpen && (
            <ProjectInput
              listInput={listInput}
              handleSetListInput={handleSetListInput}
              handleDeleteInput={handleDeleteInput}
            />
          )}
          {isSettingOpen && (
            <SettingDetail handleCloseSetting={handleCloseSetting} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
