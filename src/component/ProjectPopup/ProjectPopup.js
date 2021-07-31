import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
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
  return (
    <Dialog open={isOpen} maxWidth="xs" fullWidth onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <div>
          <Typography className={classes.title}>{subTitle}</Typography>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Your project"
            fullWidth
          />
        </div>
      </DialogContent>
      <DialogActions className={classes.actionSection}>
        <Button
          variant="contained"
          className={classes.button1}
          onClick={handleConfirm}
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
