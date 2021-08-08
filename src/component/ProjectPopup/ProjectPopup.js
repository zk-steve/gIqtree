import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  DialogActions,
  Button,
  InputAdornment,
} from "@material-ui/core";
import useStyles from "./styles";
import { Directory } from "shared/icons";
const { ipcRenderer } = window.require("electron");

function ProjectPopup({
  title,
  subTitle,
  confirmAction,
  cancelAction,
  handleClose,
  isOpen,
  handleConfirm,
}) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [isError, setIsError] = useState(false);
  const [path, setPath] = useState("");
  const [helperText, setHelperText] = useState("");
  const handleOpenDir = () => {
    if (name === "") {
      setIsError(true);
      setHelperText("Invalid text");
    } else {
      setIsError(false);
      setHelperText("");
      ipcRenderer.send("openDir", name);
    }
  };
  ipcRenderer.on("openDirSuccess", (event, data) => {
    const { filePath } = data;
    setPath(filePath);
  });
  return (
    <Dialog open={isOpen} maxWidth="xs" fullWidth onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <div>
          <Typography className={classes.title}>{subTitle}</Typography>
          <TextField
            error={isError}
            size="small"
            variant="outlined"
            placeholder="Your project"
            fullWidth
            helperText={helperText}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className={classes.directory}>
          <Typography className={classes.title}>Location</Typography>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Select path"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" onClick={handleOpenDir}>
                  <Directory />
                </InputAdornment>
              ),
            }}
            value={path}
          />
        </div>
      </DialogContent>
      <DialogActions className={classes.actionSection}>
        <Button
          variant="contained"
          className={classes.button1}
          onClick={() => {
            handleConfirm(name, path);
          }}
        >
          {confirmAction}
        </Button>
        <Button
          variant="outlined"
          className={classes.button2}
          onClick={handleClose}
        >
          {cancelAction}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProjectPopup;
