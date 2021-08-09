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
    justifyContent: "center",
    height: "90vh",
    width: "calc(100% - 42px)",
  },
}));
export default useStyles;
