import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "69px",
    backgroundColor: theme.palette.common.white,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  drag: {
    flex: 1,
    "-webkit-app-region": "drag",
    height: "100%",
  },
  avatar: {
    margin: "0 21px",
  },
  container: {
    display: "flex",
    height: "100%",
    alignItems: "center",
  },
  button: {
    height: "100%",
    "&:hover": {
      backgroundColor: theme.palette.grey[400],
    },
    transition: `0.2s ${theme.transitions.easing.easeInOut}`,
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    cursor: "default",
  },
  leftButton: {
    padding: "0 1.5rem",
    color: "black",
  },
  closeButton: {
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
  text: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "28px",
  },
  dashboard: {
    color: theme.palette.secondary.main,
  },
}));
export default useStyles;
