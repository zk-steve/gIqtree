import { Divider, Tab, Tabs, Typography } from "@material-ui/core";
import ProjectHistory from "component/ProjectHistory/ProjectHistory";
import React, { useState } from "react";
import { SmallFile } from "shared/icons";
import useStyles from "./styles";

function ProjectHistoryTable(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <div className={classes.tabBar}>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary">
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
        <Divider variant="fullWidth" />
      </div>
      <ProjectHistory
        projectName="Xử lý gen sinh học"
        status="processing"
        percent={20}
        time="July 1"
      />
      <ProjectHistory
        projectName="Xử lý gen sinh học"
        status="processing"
        percent={20}
        time="July 1"
      />
      <ProjectHistory
        projectName="Xử lý gen sinh học"
        status="processing"
        percent={20}
        time="July 1"
      />
    </div>
  );
}

export default ProjectHistoryTable;
