import { Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import Document from "shared/img/document.png";
function CreateProjectButton({ name, onClick }) {
  const classes = useStyles();
  return (
    <div className={classes.root} onClick={onClick}>
      <div className={classes.container}>
        <img src={Document} alt="document" />
        <Typography align="center" component="p">
          {name}
        </Typography>
      </div>
    </div>
  );
}

export default CreateProjectButton;
