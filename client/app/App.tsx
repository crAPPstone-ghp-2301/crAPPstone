import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import crAppTheme from "./theme";
import AppRoutes from "./AppRoutes";
import NavBar from "../features/navigation/Navbar";
import Map from "./Map";
import SideBar from "../features/navigation/SideBar";

const App = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <NavBar />
      <AppRoutes />
      <Map />
      <SideBar />
    </ThemeProvider>
  );
};

export default App;
