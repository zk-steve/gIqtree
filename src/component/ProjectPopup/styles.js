import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: "0.5rem",
  },
  button1: {
    backgroundColor: theme.palette.grey[900],
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.grey[800],
    },
  },
  button2: {
    borderColor: theme.palette.grey[900],
  },
  actionSection: {
    marginTop: "2rem",
  },
  directory: {
    marginTop: "2rem",
    "& svg": {
      cursor: "pointer",
    },
  },
}));
export default useStyles;
