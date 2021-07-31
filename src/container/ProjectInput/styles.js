import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    paddingLeft: "4rem",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "80%",
    marginTop: "1rem",
  },
  inputContainer: {
    border: `dashed 3px ${theme.palette.grey[400]}`,
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    padding: "3rem 0",
    cursor: "pointer",
    "&:hover": {
      borderColor: theme.palette.primary.main,
      "& svg": {
        transform: "translateY(-10px)",
        fill: theme.palette.primary.main,
      },
      "& p": {
        transform: "translateY(-5px)",
      },
    },
    transition: `0.15s ${theme.transitions.easing.easeInOut}`,
    "& svg": {
      transition: `0.35s ${theme.transitions.easing.easeInOut}`,
    },
    "& p": {
      transition: `0.35s ${theme.transitions.easing.easeInOut}`,
    },
  },
  input: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontWeight: 900,
    marginBottom: "0.5rem",
  },
  browse: {
    marginTop: "1rem",
  },
}));
export default useStyles;
