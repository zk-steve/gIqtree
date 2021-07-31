import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexBasis: "13%",
  },

  container: {
    width: "100%",
    marginTop: "1rem",
  },
  inputAndOutputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    fontWeight: 900,
  },
}));
export default useStyles;
