import { createTheme } from "@material-ui/core";
const theme = createTheme({
  palette: {
    primary: {
      main: "#F2F8FF",
    },
    secondary: {
      main: "#DC3A61",
    },
    action: {
      disabled: "#9D9D9D",
    },
  },
  typography: {
    fontFamily: "Euclid Circular A",
  },
});
export default theme;
