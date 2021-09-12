import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { Minimize, Maximize, UnMaximize, CloseWindow } from "shared/icons";
import useStyles from "./styles";
import clsx from "clsx";
import ProjectPopup from "component/ProjectPopup/ProjectPopup";
import Logo from "shared/img/logo.png";
import { Link, useHistory } from "react-router-dom";
const ipcRenderer = window.require("electron").ipcRenderer;
function MenuBar(props) {
  const classes = useStyles();
  const [isMaximize, setIsMaximize] = useState(false);
  const history = useHistory();
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
  useEffect(() => {
    ipcRenderer.once("maximize", () => {
      setIsMaximize(true);
    });
    ipcRenderer.once("unmaximize", () => {
      setIsMaximize(false);
    });
    ipcRenderer.on("openProjectResult", (event, data) => {
      const { status, message } = data;
      if (status === 1) {
        history.push(`/project/${message.project_id}`);
      }
    });
  }, [history]);
  const handleOpenProject = () => {
    ipcRenderer.send("openProject");
  };
  return (
    <>
      <div className={classes.root}>
        <div className={classes.container}>
          <img src={Logo} alt="logo" className={classes.avatar} />
          <Link
            to="/"
            className={clsx(
              classes.button,
              classes.leftButton,
              classes.dashboard
            )}
          >
            <div>
              <Typography variant="body2" className={classes.text}>
                Dashboard
              </Typography>
            </div>
          </Link>
          <Link to="/" className={clsx(classes.button, classes.leftButton)}>
            <div>
              <Typography variant="body2" className={classes.text}>
                New
              </Typography>
            </div>
          </Link>
          <div
            className={clsx(classes.button, classes.leftButton)}
            onClick={handleOpenProject}
          >
            <Typography variant="body2" className={classes.text}>
              Open
            </Typography>
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
