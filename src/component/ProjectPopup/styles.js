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
    width: "150px",
    height: "42px",
    textTransform: "none",
  },
  button2: {
    borderColor: theme.palette.grey[900],
    width: "150px",
    height: "42px",
    textTransform: "none",
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
  topTitle: {
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "34px",
  },
}));
export default useStyles;
