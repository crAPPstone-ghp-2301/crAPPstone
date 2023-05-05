import React from "react";
import crAppTheme from "../../app/theme";
import { ThemeProvider, Container } from "@mui/material";
import SignIn from "./SignIn";

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
        <SignIn />
      </Container>
    </ThemeProvider>
  );
};

export default NavBar;
