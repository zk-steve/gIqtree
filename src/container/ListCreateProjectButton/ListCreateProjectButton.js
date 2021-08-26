import { Typography } from "@material-ui/core";
import CreateProjectButton from "component/CreateProjectButton/CreateProjectButton";
import ProjectPopup from "component/ProjectPopup/ProjectPopup";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");
function ListCreateProjectButton(props) {
  const classes = useStyles();
  const listButton = [
    "Find Model",
    "Merge Partitions",
    "Infer Tree",
    "Assess Support",
    "Date Tree",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const history = useHistory();
  const handleClick = (name) => {
    setProjectName(name);
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    ipcRenderer.once("setProjectSuccess", (event, data) => {
      history.push(`/project/${data.project_id}`);
    });
  });

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          Create new project
        </Typography>
        <div className={classes.list}>
          {listButton.map((button, index) => (
            <CreateProjectButton
              name={button}
              onClick={() => handleClick(button)}
              key={index}
            />
          ))}
        </div>
      </div>
      <ProjectPopup
        isOpen={isOpen}
        title={`Create ${projectName} Project`}
        subTitle="Project name"
        confirmAction="Save"
        cancelAction="Cancel"
        handleClose={handleClose}
      />
    </div>
  );
}

export default ListCreateProjectButton;
