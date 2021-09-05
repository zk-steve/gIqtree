import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  main: {
    display: "flex",
    justifyContent: "flex-start",
    width: "calc(100% - 42px)",
  },
  divider: {
    height: "calc(100vh - 144px)",
  },
}));
export default useStyles;
