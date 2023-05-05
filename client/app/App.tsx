import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import crAppTheme from "./theme";
import AppRoutes from "./AppRoutes";
import NavBar from "../features/navigation/Navbar";

const App = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <NavBar />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
