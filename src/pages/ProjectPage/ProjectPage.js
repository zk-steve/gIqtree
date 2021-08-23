import { Divider } from "@material-ui/core";
import SettingMenu from "component/SettingMenu/SettingMenu";
import FolderTree from "container/FolderTree/FolderTree";
import ProjectInput from "container/ProjectInput/ProjectInput";
import ProjectSetting from "container/ProjectSetting/ProjectSetting";
import React from "react";
import useStyles from "./styles";

function ProjectPage(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ProjectSetting />
      <Divider variant="fullWidth" />
      <div className={classes.container}>
        <div className={classes.main}>
          <FolderTree />
          <Divider orientation="vertical" variant="fullWidth" />
          {/* <SettingMenu /> */}
          <ProjectInput />
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
