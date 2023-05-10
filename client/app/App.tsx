import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import crAppTheme from "./theme";
import AppRoutes from "./AppRoutes";
import SideBar from "../features/navigation/SideBar";
import Map from "./Map";
const App = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <SideBar />
      <Map />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
