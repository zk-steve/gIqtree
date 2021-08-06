import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "3rem",
  },
  container: {
    width: "70%",
    height: "100%",
    display: "flex",
    flexDirection: " column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  list: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: 600,
    fontSize: "24px",
    margin: "1rem 0",
    fontStyle: "normal",
    lineHeight: "34px",
  },
}));
export default useStyles;
