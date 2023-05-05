import React from "react";
import crAppTheme from "../../app/theme";
import { ThemeProvider, Typography, Container } from "@mui/material";

const Home = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <Container sx={{ padding: 0, margin: 0 }}>
        <Typography>map goes here~</Typography>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
