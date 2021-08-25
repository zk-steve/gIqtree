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
}));
export default useStyles;
