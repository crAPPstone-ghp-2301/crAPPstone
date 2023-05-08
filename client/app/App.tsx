import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import crAppTheme from "./theme";
import AppRoutes from "./AppRoutes";
import SideBar from "../features/navigation/SideBar";
import Map from "./Map";
import Temp from "../features/navigation/Temp";

const App = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <SideBar />
      <Temp />
      <AppRoutes />
      <Map />
    </ThemeProvider>
  );
};

export default App;
