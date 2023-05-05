import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let crAppTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D4A373",
    },
    secondary: {
      main: "#FAEDCD",
    },
    error: {
      main: "#EA0000",
    },
    warning: {
      main: "#f89446",
    },
    success: {
      main: "#46f855",
    },
    text: {
      primary: "#000",
      disabled: "#838282",
    },
    background: {
      default: "#fefae0",
    },
    ...{
      mode: "dark",
      palette: {
        primary: {
          main: "#A5A58D",
        },
        secondary: {
          main: "#CB997E",
        },
        error: {
          main: "#EA0000",
        },
        warning: {
          main: "#f89446",
        },
        success: {
          main: "#46f855",
        },
        text: {
          primary: "#000",
          disabled: "#323232",
        },
        background: {
          default: "#EDDCD2",
        },
      },
    },
  },
  typography: {
    fontFamily: "Helvetica",
  },
  shape: {
    borderRadius: 10,
  },
  overrides: {
    MuiLink: {
      root: {
        color: "#000",
      },
    },
  },
});

crAppTheme = responsiveFontSizes(crAppTheme);

export default crAppTheme;
