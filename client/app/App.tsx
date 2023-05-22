import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import crAppTheme from "./theme";
import AppRoutes from "./AppRoutes";
import SideBar from "../features/navigation/SideBar";
import Map from "./Map";
import Status from "../features/status/Status";

const App = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Status />
      <SideBar />
      <AppRoutes />
      <Map />
    </ThemeProvider>
  );
};

export default App;
