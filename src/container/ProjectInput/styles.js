import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "80%",
    marginLeft: "71px",
    paddingTop: "27px",
    boxSizing: "border-box",
    height: "100%",
  },
  inputContainer: {
    borderRadius: "8px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "262px",
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
    justifyContent: "center",
    width: "100%",
    height: "100%",
    "&:hover": {
      "& > svg": {
        transform: "translateY(-10px)",
        fill: theme.palette.secondary.main,
      },
      "&  p": {
        transform: "translateY(-5px)",
      },
    },
    cursor: "pointer",
  },
  title: {
    fontWeight: 600,
    marginBottom: "30px",
    fontSize: "2rem",
    lineHeight: "40px",
  },
  browse: {
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "20px",
  },
  smallTitle: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "28px",
    marginBottom: "12px",
  },
  smallText: {
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#EC960C",
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "41px",
  },
  uploadMoreButton: {
    textTransform: "none",
    width: "130px",
    height: "32px",
    marginTop: "25px",
    backgroundColor: theme.palette.grey[900],
    color: "white",
    "&:hover": {
      backgroundColor: "black",
    },
  },
  progress: {
    width: "120px",
    "& p": {
      color: theme.palette.secondary.main,
      fontWeight: 600,
      fontSize: "18px",
      lineHeight: "28px",
    },
  },
  progressContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  outputContent: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    whiteSpace: "pre",
    height: "90% !important",
    width: "100%",
    border: `dashed 1px ${theme.palette.action.disabled}`,
    borderRadius: "8px",
    resize: "none",
  },
  progressContent: {
    flexDirection: "column-reverse !important",
    display: "flex",
    border: `dashed 1px ${theme.palette.action.disabled}`,
    whiteSpace: "pre",
    height: "90% !important",
    resize: "none",
    borderRadius: "8px",
    width: "100%",
  },
}));
export default useStyles;
