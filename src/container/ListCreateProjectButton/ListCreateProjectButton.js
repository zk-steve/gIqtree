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
    { name: "Find Model", type: "findModel" },
    { name: "Merge Partitions", type: "mergePartition" },

    { name: "Infer Tree", type: "inferTree" },
    { name: "Assess Support", type: "assessSupport" },
    { name: "Date Tree", type: "dateTree" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const history = useHistory();
  const handleClick = (project) => {
    setProjectName(project.name);
    setProjectType(project.type);
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    ipcRenderer.once("setProjectSuccess", (event, data) => {
      const { message, status } = data;
      if (status === 1) history.push(`/project/${message.project_id}`);
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
              name={button.name}
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
        projectType={projectType}
      />
    </div>
  );
}

export default ListCreateProjectButton;
