import React, { useState } from "react";
import { Avatar, Typography } from "@material-ui/core";
import { Minimize, Maximize, UnMaximize, CloseWindow } from "shared/icons";
import useStyles from "./styles";
import clsx from "clsx";
import ProjectPopup from "component/ProjectPopup/ProjectPopup";
const ipcRenderer = window.require("electron").ipcRenderer;
function MenuBar(props) {
  const classes = useStyles();
  const [isMaximize, setIsMaximize] = useState(false);
  const onMinimize = () => {
    ipcRenderer.send("minimizeApp");
  };
  const onMaximize = () => {
    ipcRenderer.send("maximizeApp");
    setIsMaximize(true);
  };
  const onUnmaximize = () => {
    ipcRenderer.send("unmaximizeApp");
    setIsMaximize(false);
  };
  const onClose = () => {
    ipcRenderer.send("closeApp");
  };
  ipcRenderer.on("maximize", () => {
    setIsMaximize(true);
  });
  ipcRenderer.on("unmaximize", () => {
    setIsMaximize(false);
  });
  return (
    <>
      <div className={classes.root}>
        <div className={classes.container}>
          <Avatar className={classes.avatar}>D</Avatar>
          <div className={clsx(classes.button, classes.leftButton)}>
            <Typography variant="body2">Dashboard</Typography>
          </div>
          <div className={clsx(classes.button, classes.leftButton)}>
            <Typography variant="body2">New</Typography>
          </div>
          <div className={clsx(classes.button, classes.leftButton)}>
            <Typography variant="body2">Open</Typography>
          </div>
        </div>
        <div className={classes.drag}></div>
        <div className={classes.container}>
          <div className={classes.button} onClick={onMinimize}>
            <Minimize />
          </div>
          <div
            className={classes.button}
            onClick={isMaximize ? onUnmaximize : onMaximize}
          >
            {isMaximize ? <UnMaximize /> : <Maximize />}
          </div>
          <div
            className={clsx(classes.button, classes.closeButton)}
            onClick={onClose}
          >
            <CloseWindow />
          </div>
        </div>
      </div>
      <ProjectPopup title="Save this project" subTitle="Project name" />
    </>
  );
}

export default MenuBar;
