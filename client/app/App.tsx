import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import crAppTheme from "./theme";
import Profile from "../features/navigation/Profile";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <Container sx={{ margin: 0, padding: 0, width: "100%" }}>
        <CssBaseline />
        <Profile />
        <AppRoutes />
      </Container>
    </ThemeProvider>
  );
};

export default App;
