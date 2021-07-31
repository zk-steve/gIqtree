import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "1rem",
  },
  form: {
    width: "40%",
  },
  input: {
    borderRadius: "20px",
    backgroundColor: theme.palette.grey[300],
    border: "none",
    padding: "0 1rem",
    width: "100%",
    "& input": {
      paddingLeft: "0.5rem",
      border: "none",
    },
  },
}));
export default useStyles;
