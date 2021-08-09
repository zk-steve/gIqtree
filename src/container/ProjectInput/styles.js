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
    marginTop: "27px",
  },
  inputContainer: {
    border: `dashed 1px ${theme.palette.action.disabled}`,
    borderRadius: "8px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "852px",
    height: "262px",
    cursor: "pointer",
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
}));
export default useStyles;
