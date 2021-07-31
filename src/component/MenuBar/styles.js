import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "1.75rem",
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
    width: "24px",
    height: "24px",
    margin: "0 1rem",
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
    padding: "0 1rem",
    display: "flex",
    alignItems: "center",
    cursor: "default",
  },
  leftButton: {
    padding: "0 0.5rem",
  },
  closeButton: {
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
}));
export default useStyles;
