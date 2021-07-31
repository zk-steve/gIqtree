import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "1rem 0",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    width: "97%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectSetting: {
    flexBasis: "15%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexBasis: "20%",
    alignItems: "center",
  },
  setting: {
    borderRadius: "5px",
    backgroundColor: theme.palette.grey[900],
    padding: "0.25rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.grey[600],
    },
    transition: `0.15s ${theme.transitions.easing.easeIn}`,
  },
  title: {
    fontWeight: 900,
  },
}));
export default useStyles;
