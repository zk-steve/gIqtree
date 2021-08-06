import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: "1rem",
  },
  tableHead: {
    width: "100%",
    margin: "1rem 0",
  },
  columnContainer: {
    width: "70%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameColumn: {
    flexBasis: "80%",
    color: " #696969",
    fontSize: "14px",
    fontWeight: "normal",
    lineHeight: "21px",
    fontStyle: "normal",
  },
  fileIcon: {
    flexBasis: "6%",
    display: "flex",
    justifyContent: "flex-start",
  },
  lastColumn: {
    flex: 1,
    color: " #696969",
    fontSize: "14px",
    fontWeight: "normal",
    lineHeight: "21px",
    fontStyle: "normal",
  },
  tabBar: {
    width: "15%",
    "& button": {
      width: "50%",
      minWidth: "74px",
    },
    "& span": {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "16px",
    },
  },
}));
export default useStyles;
