import { Typography } from "@material-ui/core";
import React from "react";
import { Document } from "shared/icons";
import useStyles from "./styles";

function CreateProjectButton({ name, onClick }) {
  const classes = useStyles();
  return (
    <div className={classes.root} onClick={onClick}>
      <div className={classes.container}>
        <Document />
        <Typography align="center">{name}</Typography>
      </div>
    </div>
  );
}

export default CreateProjectButton;
