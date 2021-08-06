import { alpha, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexBasis: "18%",
    minHeight: "62px",
    minWidth: "168px",
    cursor: "pointer",
    "&:hover": {
      background: "linear-gradient(45.92deg, #FFF2F3 -13.5%, #FFE1DE 75.22%)",
    },
    backgroundColor: theme.palette.primary.main,
    transition: `0.1s ${theme.transitions.easing.easeInOut}`,
    boxShadow: "6px 4px 4px rgba(0, 0, 0, 0.25)",
    border: "0.5px solid #EEEEEE",
    boxSizing: "border-box",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "75%",

    "& > img": {
      position: "absolute",
      top: "5px",
      left: "5px",
    },
    "& > p": {
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "24px",
      fontStyle: "normal",
    },
  },
}));
export default useStyles;
