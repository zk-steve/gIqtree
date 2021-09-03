import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    height: "100%",
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  settingDetail: {
    marginLeft: "35px",
    marginTop: "26px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  settingDetailTitle: {
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: "34px",
  },
  textInput: {
    height: "37px",
    width: "435px",
  },
  inputLabel: {
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "28px",
    marginBottom: "8px",
    color: "black",
  },
  textInputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: "26px",
  },
  radioInput: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "&>input": {
      margin: 0,
    },
  },
  radioLabel: {
    color: "black",
    marginLeft: "18px",
    textAlign: "start",
    lineHeight: "21px",
  },
  dataRadioContainer: {
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    columnGap: "65px",
    rowGap: "22px",
  },
  codonList: {
    width: "807px",
    height: "300px",
    border: "1px solid #EBECED",
    borderRadius: "3px",
    marginTop: "24px",
    overflowY: "auto",
    "& > div": {
      marginTop: "22px",
    },
    paddingLeft: "36px",
  },
  modelFinderHead: {
    width: "100%",
    height: "50px",
    borderBottom: "1px solid #EBECED",
    display: "flex",
    alignItems: "center",
    "& > p": {
      fontWeight: 600,
    },
    "& > #model": {
      marginLeft: "102px",
      width: "170px",
      textAlign: "left",
    },
    "& > #df": {
      textAlign: "left",
      width: "90px",
    },
    "& > #explanation": {
      textAlign: "left",
    },
  },
  first: {
    marginLeft: "66px",
  },
  modelTableHead: {
    marginTop: "0 !important",
  },
  modelTable: {
    padding: 0,
  },
  listModel: {
    paddingLeft: "36px",
    margin: 0,
    "& > div": {
      marginTop: "22px",
    },
  },
  modelMargin: {
    marginLeft: "calc(102px - 36px - 12.8px)",
    width: "170px",
  },
  df: {
    width: "90px",
    margin: 0,
  },
  expl: {
    margin: 0,
  },
  fontSmall: {
    fontSize: "14px !important",
  },
  shortPath: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "& > p": {
      width: "300px",
    },
  },
  shortTextInput: {
    width: "170px",
    height: "37px",
  },
  selectMargin: {
    marginTop: "18px",
  },
  selectMarginLeft: {
    marginLeft: "20px",
  },
  twoOption: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    columnGap: "60px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: "35px",
    marginTop: "50px",
  },
  button1: {
    backgroundColor: theme.palette.grey[900],
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.grey[800],
    },
    width: "150px",
    height: "42px",
    textTransform: "none",
    transition: `0.15s ${theme.transitions.easing.easeIn}`,
  },
  button2: {
    borderColor: theme.palette.grey[900],
    width: "150px",
    height: "42px",
    textTransform: "none",
    marginLeft: "18px",
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    },
    transition: `0.15s ${theme.transitions.easing.easeIn}`,
  },
}));
export default useStyles;
