import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "775px",
    height: "37px",
    backgroundColor: "#EBECED",
    position: "relative",
    "&:hover": {
      backgroundColor: theme.palette.grey[500],
    },
    transition: `0.15s ${theme.transitions.easing.easeIn}`,
    cursor: "pointer",
  },
  fileIcon: {
    marginLeft: "12.5px",
    marginRight: "9.5px",
  },
  closeIcon: {
    position: "absolute",
    top: -7,
    right: -7,
  },
}));
export default useStyles;
