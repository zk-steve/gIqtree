import { Divider } from "@material-ui/core";
import FolderTree from "container/FolderTree/FolderTree";
import ProjectInput from "container/ProjectInput/ProjectInput";
import ProjectSetting from "container/ProjectSetting/ProjectSetting";
import SettingDetail from "container/SettingDetail/SettingDetail";
import React, { useState } from "react";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");

function ProjectPage(props) {
  const classes = useStyles();
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [outputList, setOutputList] = useState([]);
  const handleOpenSetting = () => {
    if (!isSettingOpen) setIsSettingOpen(true);
  };
  const handleCloseSetting = () => {
    setIsSettingOpen(false);
  };
  const handleExecute = (id) => {
    console.log(id);
    ipcRenderer
      .invoke("executeProject", id)
      .then((data) => setOutputList([...data]));
  };
  return (
    <div className={classes.root}>
      <ProjectSetting
        handleOpenSetting={handleOpenSetting}
        handleExecute={handleExecute}
      />
      <Divider variant="fullWidth" />
      <div className={classes.container}>
        <div className={classes.main}>
          <FolderTree outputList={outputList} />
          <Divider orientation="vertical" variant="fullWidth" />
          {!isSettingOpen && <ProjectInput />}
          {isSettingOpen && (
            <SettingDetail handleCloseSetting={handleCloseSetting} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
