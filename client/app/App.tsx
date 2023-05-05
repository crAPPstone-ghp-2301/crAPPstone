import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import crAppTheme from "./theme";
import { MainContainer } from "../features/styles/StyleGuide";
import Profile from "../features/navigation/Profile";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <MainContainer>
        <Profile />
        <AppRoutes />
      </MainContainer>
    </ThemeProvider>
  );
};

export default App;
