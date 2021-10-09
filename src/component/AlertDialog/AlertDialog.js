import React, { createContext, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
export const DialogContext = createContext({})
function AlertDialogContext({children}) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const handleClose = () => {
    setIsOpen(false)
  }
  const handleShowAlert = (message) => {
    setIsOpen(true);
    setMessage(message)
  }
  return (
    <DialogContext.Provider  value={{handleShowAlert}} >
      {children}
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        <Typography className={classes.title}>Alert</Typography>
      </DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
    </DialogContext.Provider>
  );
}

export default AlertDialogContext;
