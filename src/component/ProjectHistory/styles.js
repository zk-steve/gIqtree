import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    },
    transition: `0.1s ${theme.transitions.easing.easeIn}`,
    cursor: "pointer",
    padding: "0.5rem 0",
  },
  container: {
    width: "70%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  project: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexBasis: "80%",
  },
  fileIcon: {
    flexBasis: "6%",
    display: "flex",
    justifyContent: "flex-start",
  },
  lastColumn: {
    flex: 1,
  },
  progress: {
    fontSize: "10px",
    lineHeight: "12px",
    color: "#393D56",
  },
}));
export default useStyles;
