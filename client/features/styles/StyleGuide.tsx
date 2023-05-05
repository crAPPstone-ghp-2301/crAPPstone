import React from "react";
import {
  ThemeProvider,
  CssBaseline,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import crAppTheme from "../../app/theme";

const MainContainer = styled(Container)({
  width: "100%",
  top: 0,
  left: 0,
  margin: 0,
  padding: 2,
  backgroundColor: `${crAppTheme.palette.primary.main}`,
  color: `${crAppTheme.palette.text.primary}`,
});

const PaletteBox = styled(Box)({
  display: "flex",
  margin: 2,
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${crAppTheme.palette.primary.light}`,
  width: "calc((100vw - 10px) / 5)",
  minHeight: "calc((100vh - 200px) / 5)",
  textAlign: "center",
  textTransform: "uppercase",
});

const StyleGuide = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <MainContainer
        sx={{
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          crAPP's Style Guide
        </Typography>

        <Typography variant="h5" sx={{ textAlign: "center", margin: 2 }}>
          Color Palette
        </Typography>
        <Typography sx={{ textAlign: "center" }}>Light Theme</Typography>
        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <PaletteBox sx={{ backgroundColor: crAppTheme.palette.primary.main }}>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              {crAppTheme.palette.primary.main}
            </Typography>
          </PaletteBox>
          <PaletteBox
            sx={{
              backgroundColor: `${crAppTheme.palette.primary.light}`,
            }}
          >
            <Typography variant="body1">
              {crAppTheme.palette.primary.light}
            </Typography>
          </PaletteBox>
          <PaletteBox
            sx={{
              backgroundColor: `${crAppTheme.palette.primary.dark}`,
            }}
          >
            <Typography variant="body1">
              {crAppTheme.palette.primary.dark}
            </Typography>
          </PaletteBox>
        </Container>
        <Typography sx={{ textAlign: "center" }}>Dark Theme</Typography>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <PaletteBox
            sx={{ backgroundColor: crAppTheme.palette.secondary.main }}
          >
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              {crAppTheme.palette.secondary.main}
            </Typography>
          </PaletteBox>
          <PaletteBox
            sx={{
              backgroundColor: `${crAppTheme.palette.secondary.light}`,
            }}
          >
            <Typography variant="body1">
              {crAppTheme.palette.secondary.light}
            </Typography>
          </PaletteBox>
          <PaletteBox
            sx={{
              backgroundColor: `${crAppTheme.palette.secondary.dark}`,
            }}
          >
            <Typography variant="body1">
              {crAppTheme.palette.secondary.dark}
            </Typography>
          </PaletteBox>
        </Container>
        <Typography sx={{ textAlign: "center" }}>Status Colors</Typography>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <PaletteBox
            sx={{
              backgroundColor: crAppTheme.palette.error.main,
            }}
          >
            <Typography variant="body1">
              Error: {crAppTheme.palette.error.main}
            </Typography>
          </PaletteBox>
          <PaletteBox
            sx={{
              backgroundColor: crAppTheme.palette.warning.main,
            }}
          >
            <Typography variant="body1">
              Warning: {crAppTheme.palette.warning.main}
            </Typography>
          </PaletteBox>
          <PaletteBox
            sx={{
              backgroundColor: crAppTheme.palette.success.main,
            }}
          >
            <Typography variant="body1">
              Success: {crAppTheme.palette.success.main}
            </Typography>
          </PaletteBox>
        </Container>

        <Typography variant="h5" sx={{ textAlign: "center", margin: 2 }}>
          Fonts
        </Typography>
        <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
          <Typography variant="h1">Heading 1: viverra</Typography>
        </Box>
        <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
          <Typography variant="h2">Heading 2: ligula ullamcorper</Typography>
        </Box>
        <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
          <Typography variant="h3">Heading 3: amet consectetur</Typography>
        </Box>
        <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
          <Typography variant="h4">Heading 4: vulputate sapien</Typography>
        </Box>
        <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
          <Typography variant="h5">
            Heading 5: massa eget egestas purus viverra accumsan in nisl
          </Typography>
        </Box>
        <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
          <Typography variant="body1">
            Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id
            interdum velit laoreet id donec ultrices.
          </Typography>
        </Box>
        <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
          <Typography variant="body2">
            Body 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id
            interdum velit laoreet id donec ultrices.
          </Typography>
        </Box>
        <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
          <Typography variant="subtitle1">
            Subtitle 1: non nisi est sit amet facilisis magna etiam
          </Typography>
        </Box>
        <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
          <Typography variant="subtitle2">
            Subtitle 2: non nisi est sit amet facilisis magna etiam
          </Typography>
        </Box>
        <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
          <Typography variant="caption">
            Caption: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Box>
        <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
          <Typography variant="overline">
            Overline: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Box>
      </MainContainer>
    </ThemeProvider>
  );
};

export default StyleGuide;

export { MainContainer };
