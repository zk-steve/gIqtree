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
  },
  fileName: {
    fontWeight: 500,
    lineHeight: "24px",
    marginLeft: "30px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));
export default useStyles;
