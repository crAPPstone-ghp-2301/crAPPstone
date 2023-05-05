import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let crAppTheme = createTheme({
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
  typography: {
    fontFamily: "Helvetica",
    h1: {
      fontSize: "42pt",
      fontWeight: 700,
      lineHeight: 1.2,
      marginBottom: "1.5rem",
    },
    h2: {
      fontSize: "36pt",
      fontWeight: 700,
      lineHeight: 1.2,
      marginBottom: "1.25rem",
    },
    h3: {
      fontSize: "32pt",
      fontWeight: 700,
      lineHeight: 1.2,
      marginBottom: "1rem",
    },
    h4: {
      fontSize: "28pt",
      fontWeight: 700,
      lineHeight: 1.2,
      marginBottom: "1rem",
    },
    h5: {
      fontSize: "24pt",
      fontWeight: 700,
      lineHeight: 1.2,
      marginBottom: "0.75rem",
    },
    body1: {
      fontSize: "20pt",
      fontWeight: 400,
      lineHeight: 1.5,
      marginBottom: "1.25rem",
    },
    body2: {
      fontSize: "16pt",
      fontWeight: 400,
      lineHeight: 1.5,
      marginBottom: "1rem",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

crAppTheme = responsiveFontSizes(crAppTheme);

export default crAppTheme;
