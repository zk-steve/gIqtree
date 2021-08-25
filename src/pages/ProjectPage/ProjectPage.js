import { Divider } from "@material-ui/core";
import FolderTree from "container/FolderTree/FolderTree";
import ProjectInput from "container/ProjectInput/ProjectInput";
import ProjectSetting from "container/ProjectSetting/ProjectSetting";
import SettingDetail from "container/SettingDetail/SettingDetail";
import React, { useState } from "react";
import useStyles from "./styles";

function ProjectPage(props) {
  const classes = useStyles();
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const handleOpenSetting = () => {
    if (!isSettingOpen) setIsSettingOpen(true);
  };
  const handleCloseSetting = () => {
    setIsSettingOpen(false);
  };
  return (
    <div className={classes.root}>
      <ProjectSetting handleOpenSetting={handleOpenSetting} />
      <Divider variant="fullWidth" />
      <div className={classes.container}>
        <div className={classes.main}>
          <FolderTree />
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
