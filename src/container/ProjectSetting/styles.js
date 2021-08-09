import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "1rem 0",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    width: "calc(100% - 42px)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectSetting: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  setting: {
    borderRadius: "6px",
    width: "40px",
    height: "40px",
    backgroundColor: theme.palette.grey[900],
    marginLeft: "24px",
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
    fontWeight: 600,
    fontSize: "28px",
    lineHeight: "40px",
  },
  button: {
    width: "136px",
    height: "40px",
    textTransform: "none",
    marginLeft: "20px",
  },
}));
export default useStyles;
