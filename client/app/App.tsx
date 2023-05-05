import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import crAppTheme from "./theme";
import Profile from "../features/navigation/Profile";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Container
        sx={{
          backgroundColor: `${crAppTheme.palette.primary.main}`,
          color: `${crAppTheme.palette.text.primary}`,
        }}
      >
        <Profile />
        <AppRoutes />
      </Container>
    </ThemeProvider>
  );
};

export default App;
