import { Button, Typography } from "@material-ui/core";
import AlertDialog from "component/AlertDialog/AlertDialog";
import ListInputFiles from "container/ListInputFiles/ListInputFiles";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { InputFileIcon } from "shared/icons";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");

function ProjectInput(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [listInput, setListInput] = useState([]);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [listId, setListId] = useState([]);
  const handleSelectInput = () => {
    ipcRenderer.send("selectDialog", id);
  };
  ipcRenderer.on("selectFile", (event, data) => {
    const { fileName, filePath, inputs_id } = data.message;
    if (fileName && filePath) {
      setListInput([...listInput, fileName]);
      setListId([...listId, inputs_id]);
    } else setIsOpenAlert(true);
  });
  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };
  const handleDeleteFile = (fileId) => {
    const data = { input_id: fileId, project_id: id };
    ipcRenderer.send("deleteInput", data);
  };
  ipcRenderer.on("deleteResult", (event, data) => {
    console.log(data);
  });
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          Input
        </Typography>
        <Typography className={classes.smallTitle}>Select MSA file</Typography>
        <div className={classes.inputContainer}>
          {listInput.length === 0 && (
            <div className={classes.input} onClick={handleSelectInput}>
              <InputFileIcon />
              <div className={classes.textContainer}>
                <Typography className={classes.smallText} component="p">
                  Browse
                </Typography>
                &nbsp;
                <Typography className={classes.browse} component="p">
                  to choose a file
                </Typography>
              </div>
            </div>
          )}
          {listInput.length > 0 && (
            <ListInputFiles
              listInput={listInput}
              onDeleteFile={handleDeleteFile}
              listId={listId}
            />
          )}
        </div>
        {listInput.length > 0 && (
          <Button
            variant="contained"
            className={classes.uploadMoreButton}
            onClick={handleSelectInput}
          >
            Upload more
          </Button>
        )}
      </div>
      <AlertDialog isOpen={isOpenAlert} handleClose={handleCloseAlert} />
    </div>
  );
}

export default ProjectInput;
