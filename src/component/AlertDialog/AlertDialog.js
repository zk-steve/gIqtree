import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
function AlertDialog({ isOpen, handleClose }) {
  const classes = useStyles();
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        <Typography className={classes.title}>Alert</Typography>
      </DialogTitle>
      <DialogContent>Your file(s) already selected</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
