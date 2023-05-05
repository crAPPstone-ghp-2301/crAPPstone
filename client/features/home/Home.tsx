import React from "react";
import crAppTheme from "../../app/theme";
import { ThemeProvider, Typography } from "@mui/material";

const Home = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <Typography>map goes here~</Typography>
    </ThemeProvider>
  );
};

export default Home;
