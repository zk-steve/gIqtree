import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "1rem",
  },
  form: {
    width: "518px",
  },
  input: {
    borderRadius: "20px",
    backgroundColor: "white",
    border: "1px solid #E7E9F1",
    padding: "0 1rem",
    width: "100%",
    "& input": {
      paddingLeft: "0.5rem",
      border: "none",
    },
    height: "40px",
  },
}));
export default useStyles;
