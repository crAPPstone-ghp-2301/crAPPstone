import React from "react";
import crAppTheme from "../../app/theme";
import { styled } from "@mui/material/styles";
import { ThemeProvider, Typography, Container, Box } from "@mui/material";

const MainContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  margin: 0,
  padding: 0,
}));

const StyleGuide = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <MainContainer>
        <Typography variant="h1">crAPP the Map's Style Guide</Typography>
        {/* Color Palette */}
        <Container>
          <Box sx={{ bgcolor: "primary.main" }}></Box>
        </Container>
      </MainContainer>
    </ThemeProvider>
  );
};

export { MainContainer };

export default StyleGuide;
