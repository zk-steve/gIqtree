import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  container: {
    width: "97%",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    height: "90vh",
  },
}));
export default useStyles;
