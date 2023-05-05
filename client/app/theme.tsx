import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let crAppTheme = createTheme({
  typography: {
    fontFamily: "Helvetica",
    h1: {
      fontSize: "2.625rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: "1.75rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: "1.25rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  palette: {
    primary: {
      main: "#FEFAE0",
      light: "#FAEDCD",
      dark: "#D4A373",
    },
    secondary: {
      main: "#EDDCD2",
      light: "#CB997E",
      dark: "#A5A58D",
    },
    error: {
      main: "#EA0000",
    },
    warning: {
      main: "#f89446",
    },
    success: {
      main: "#0bb000",
    },
    text: {
      primary: "#000",
      secondary: "#D4A373",
      disabled: "#838282",
    },
    background: {
      default: "#FFF",
    },
  },
});

crAppTheme = responsiveFontSizes(crAppTheme);

export default crAppTheme;
