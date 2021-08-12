import { Button, Typography } from "@material-ui/core";
import AlertDialog from "component/AlertDialog/AlertDialog";
import InputFile from "component/InputFile/InputFile";
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
  const handleSelectInput = () => {
    ipcRenderer.send("selectDialog", id);
  };
  ipcRenderer.on("selectFile", (event, data) => {
    const { fileName, filePath } = data.message;
    if (fileName && filePath) setListInput([...listInput, fileName]);
    else setIsOpenAlert(true);
  });
  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };
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
          {listInput.length > 0 && <ListInputFiles listInput={listInput} />}
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
