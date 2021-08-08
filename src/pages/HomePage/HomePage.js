import { Divider } from "@material-ui/core";
import SearchField from "component/SearchField/SearchField";
import ListCreateProjectButton from "container/ListCreateProjectButton/ListCreateProjectButton";
import ProjectHistoryTable from "container/ProjectHistorytable/ProjectHistoryTable";
import React from "react";
import { withRouter } from "react-router-dom";
import useStyles from "./styles";

function HomePage(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <ListCreateProjectButton />
        <Divider variant="fullWidth" />
        <SearchField />
        <ProjectHistoryTable />
      </div>
    </div>
  );
}

export default withRouter(HomePage);
