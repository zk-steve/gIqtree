import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");

function FolderTree(props) {
  const classes = useStyles();
  const [listName, setListName] = useState([]);
  useEffect(() => {
    const selectFile = (event, data) => {
      const { message } = data;
      if (Array.isArray(message)) setListName([...listName, ...message]);
    };
    const deleteResult = (event, response) => {
      const { name, status } = response;
      if (status === 1) {
        const newListName = listName.filter((input) => input.name !== name);
        setListName(newListName);
      }
    };
    ipcRenderer.once("selectFile", selectFile);
    ipcRenderer.once("deleteResult", deleteResult);
    return () => {
      ipcRenderer.removeListener("selectFile", selectFile);
      ipcRenderer.removeListener("deleteResult", deleteResult);
    };
  }, [listName]);

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
