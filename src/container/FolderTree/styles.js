import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "229px",
  },
  container: {
    width: "100%",
    marginTop: "26px",
  },
  inputAndOutputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "34px",
    marginBottom: "20px",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
    cursor: "pointer",
  },
  fileName: {
    fontWeight: 500,
    lineHeight: "24px",
    paddingLeft: "30px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    marginBottom: "10px",
    textAlign: "start",
    width: "80%",
    cursor: "default",
    "&:hover": {
      backgroundColor: "#EBECED",
    },
    paddingTop: "5px",
    paddingBottom: "5px",
  },
  isCurrentTab: {
    color: theme.palette.secondary.main,
  },
  isCurrentFile: {
    backgroundColor: "#EBECED",
  },
}));
export default useStyles;
