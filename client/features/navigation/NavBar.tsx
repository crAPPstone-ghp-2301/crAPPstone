import React from "react";
import crAppTheme from "../../app/theme";
import { ThemeProvider, Container } from "@mui/material";
import Profile from "./Profile";

const NavBar = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "transparent",
        }}
      >
        <Profile />
      </Container>
    </ThemeProvider>
  );
};

export default NavBar;
