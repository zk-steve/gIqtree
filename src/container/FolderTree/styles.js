import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    overflowY: "auto",
    overflowX: "hidden",
  },
  container: {
    width: "100%",
    marginTop: "26px",
  },
  inputAndOutputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: "hidden",
    textAlign: "left",
  },
  title: {
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "34px",
    marginBottom: "20px",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
    cursor: "pointer",
  },
  fileName: {
    fontWeight: 500,
    lineHeight: "24px",
    paddingLeft: "30px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    marginBottom: "10px",
    textAlign: "start",
    width: "calc(95% - 30px)",
    cursor: "default",
    "&:hover": {
      backgroundColor: "#EBECED",
    },
    paddingTop: "5px",
    paddingBottom: "5px",
  },
  isCurrentTab: {
    color: theme.palette.secondary.main,
  },
  isCurrentFile: {
    backgroundColor: "#EBECED",
  },
  treeFile: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
    paddingRight: "10px",
  },
  treeContent: {
    "& .MuiTreeItem-content": {
      padding: 0,
    },
  },
  inputTreeIndex: {
    width: "fit-content",
  },
}));
export default useStyles;
