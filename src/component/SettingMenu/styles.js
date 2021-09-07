import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexBasis: "196px",
    // height: "711px",
    backgroundColor: "#F9F9F9",
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  settingTitle: {
    marginTop: "27px",
    display: "flex",
    marginLeft: "22px",
    marginRight: "13px",
    marginBottom: "19px",
    justifyContent: "space-between",
    alignItems: "center",
    "& > p": {
      fontWeight: 600,
      fontSize: "18px",
      lineHeight: "28px",
    },
    "& > svg": {
      cursor: "pointer",
      "&:hover": {
        "& > circle": {
          fill: theme.palette.grey[500],
        },
      },
    },
  },
  settingOption: {
    width: "100%",
    height: "36px",
    display: "flex",
    alignItems: "center",
    "& > p": {
      marginLeft: "41px",
      fontWeight: 500,
    },
    "&:hover": {
      backgroundColor: "#eeeeee",
    },
    cursor: "default",
  },
  onSelect: {
    backgroundColor: "#eeeeee",
  },
}));
export default useStyles;
