import { Typography } from "@material-ui/core";
import CreateProjectButton from "component/CreateProjectButton/CreateProjectButton";
import ProjectPopup from "component/ProjectPopup/ProjectPopup";
import React, { useState } from "react";
import useStyles from "./styles";

function ListCreateProjectButton(props) {
  const classes = useStyles();
  const listButton = [
    "Find Model",
    "Merge Partitions",
    "Infer Tree",
    "Asset Support",
    "Data Tree",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const handleClick = (name) => {
    setProjectName(name);
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          Create new project
        </Typography>
        <div className={classes.list}>
          {listButton.map((button) => (
            <CreateProjectButton
              name={button}
              onClick={() => handleClick(button)}
            />
          ))}
        </div>
      </div>
      <ProjectPopup
        isOpen={isOpen}
        title={`Create ${projectName} Project`}
        subTitle="Project name"
        confirmAction="confirm"
        cancelAction="Cancel"
        handleClose={handleClose}
      />
    </div>
  );
}

export default ListCreateProjectButton;
