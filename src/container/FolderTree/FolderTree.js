import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");

function FolderTree(props) {
  const classes = useStyles();
  const [listName, setListName] = useState([]);
  ipcRenderer.on("selectFile", (event, data) => {
    const { message } = data;
    if (Array.isArray(message)) setListName([...listName, ...message]);
  });
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.inputAndOutputContainer}>
          <Typography className={classes.title}>Input</Typography>
          {listName.length > 0 &&
            listName.map((name, index) => (
              <Typography className={classes.fileName} key={index}>
                {name.name}
              </Typography>
            ))}
        </div>
        <div className={classes.inputAndOutputContainer}>
          <Typography className={classes.title}>Output</Typography>
        </div>
      </div>
    </div>
  );
}

export default FolderTree;
