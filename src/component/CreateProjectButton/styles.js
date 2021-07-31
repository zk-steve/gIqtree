import { alpha, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexBasis: "18%",
    height: "52px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: alpha(theme.palette.secondary.light, 0.2),
    },
    backgroundColor: alpha(theme.palette.info.light, 0.2),
    transition: `0.1s ${theme.transitions.easing.easeInOut}`,
    boxShadow: theme.shadows[4],
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "75%",

    "& > svg": {
      position: "absolute",
      top: "5px",
      left: "5px",
    },
  },
}));
export default useStyles;
