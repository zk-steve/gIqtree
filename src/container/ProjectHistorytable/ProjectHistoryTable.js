import { Divider, Tab, Tabs, Typography } from "@material-ui/core";
import ProjectHistory from "component/ProjectHistory/ProjectHistory";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { SmallFile } from "shared/icons";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");
function ProjectHistoryTable(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [listHistory, setListHistory] = useState([]);
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChooseHistory = (id) => {
    history.push(`/project/${id}`);
  };
  useEffect(() => {
    ipcRenderer.send("getHistory");
    const returnHistory = (event, data) => {
      const { message, status } = data;
      if (status === 1) setListHistory(message);
    };
    const searchProject = (event, data) => {
      const { message, status } = data;
      if (status === 1) setListHistory(message);
    };
    ipcRenderer.on("returnHistory", returnHistory);
    ipcRenderer.on("searchProject", searchProject);
    return () => {
      ipcRenderer.removeListener("returnHistory", returnHistory);
      ipcRenderer.removeListener("searchProject", searchProject);
    };
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.tabBar}>
        <Tabs value={value} onChange={handleChange} indicatorColor="secondary">
          <Tab label="Recently" />
          <Tab label="Oldest" />
        </Tabs>
      </div>
      <div className={classes.tableHead}>
        <div className={classes.columnContainer}>
          <div className={classes.fileIcon}>
            <SmallFile />
          </div>
          <Typography className={classes.nameColumn} align="left">
            Name project
          </Typography>
          <Typography align="left" className={classes.lastColumn}>
            Time upload
          </Typography>
        </div>
        <Divider variant="fullWidth" className={classes.divider} />
      </div>
      {listHistory.map((project, index) => (
        <ProjectHistory
          projectName={project.name}
          percent={project.process}
          time={project.time}
          key={index}
          onClick={() => handleChooseHistory(project.project_id)}
        />
      ))}
    </div>
  );
}

export default ProjectHistoryTable;
