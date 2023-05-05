import React from "react";
import {
  ThemeProvider,
  CssBaseline,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import crAppTheme from "../../app/theme";

// Primary button
const PrimaryButton = styled(Button)({
  border: `1px solid ${crAppTheme.palette.primary.dark}`,
  backgroundColor: `${crAppTheme.palette.primary.dark}`,
  color: `${crAppTheme.palette.primary.main}`,
  borderRadius: 20,
  fontWeight: 600,
  textTransform: "capitalize",
  margin: 4,
  padding: "10px 40px",
  "&:hover": {
    boxShadow: "1px 1px 2.5px rgba(0, 0, 0, 0.5)",
    backgroundColor: `${crAppTheme.palette.primary.dark}`,
    color: `${crAppTheme.palette.primary.main}`,
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

// Secondary button
const SecondaryButton = styled(Button)({
  border: `1px solid ${crAppTheme.palette.primary.dark}`,
  color: `${crAppTheme.palette.primary.dark}`,
  borderRadius: 20,
  fontWeight: 500,
  textTransform: "capitalize",
  margin: 4,
  padding: "5px 20px",
  "&:hover": {
    boxShadow: "1px 1px 2.5px rgba(0, 0, 0, 0.5)",
    backgroundColor: `${crAppTheme.palette.primary.light}`,
    color: `${crAppTheme.palette.primary.dark}`,
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

// Tertiary button
const TertiaryButton = styled(Button)({
  color: `${crAppTheme.palette.primary.dark}`,
  fontWeight: 400,
  textTransform: "capitalize",
  margin: 4,
  padding: "5px 10px",
  "&:hover": {
    backgroundColor: `${crAppTheme.palette.primary.light}`,
    color: `${crAppTheme.palette.primary.dark}`,
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

const PaletteBox = styled(Box)({
  display: "flex",
  margin: 2,
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${crAppTheme.palette.primary.light}`,
  width: "50rem",
  textAlign: "center",
  textTransform: "uppercase",
});

const StyleGuide = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Container
        sx={{
          alignItems: "center",
          alignContent: "center",
          backgroundColor: `${crAppTheme.palette.primary.main}`,
          color: `${crAppTheme.palette.text.primary}`,
        }}
      >
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          crAPP's Style Guide
        </Typography>

        <Typography variant="h5" sx={{ textAlign: "center", margin: 2 }}>
          Color Palette
        </Typography>
        <Container
          sx={{
            width: "70%",
            padding: 3,
            border: `1px dashed ${crAppTheme.palette.primary.light}`,
          }}
        >
          <Typography sx={{ textAlign: "center" }}>Light Theme</Typography>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <PaletteBox
              sx={{ backgroundColor: crAppTheme.palette.primary.main }}
            >
              <Typography variant="overline" sx={{ textAlign: "center" }}>
                Main {crAppTheme.palette.primary.main}
              </Typography>
            </PaletteBox>
            <PaletteBox
              sx={{
                backgroundColor: `${crAppTheme.palette.primary.light}`,
              }}
            >
              <Typography variant="overline">
                Light {crAppTheme.palette.primary.light}
              </Typography>
            </PaletteBox>
            <PaletteBox
              sx={{
                backgroundColor: `${crAppTheme.palette.primary.dark}`,
              }}
            >
              <Typography variant="overline">
                Dark {crAppTheme.palette.primary.dark}
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
              <Typography variant="overline" sx={{ textAlign: "center" }}>
                Main {crAppTheme.palette.secondary.main}
              </Typography>
            </PaletteBox>
            <PaletteBox
              sx={{
                backgroundColor: `${crAppTheme.palette.secondary.light}`,
              }}
            >
              <Typography variant="overline">
                Light {crAppTheme.palette.secondary.light}
              </Typography>
            </PaletteBox>
            <PaletteBox
              sx={{
                backgroundColor: `${crAppTheme.palette.secondary.dark}`,
              }}
            >
              <Typography variant="overline">
                Dark {crAppTheme.palette.secondary.dark}
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
              <Typography variant="overline">
                Error {crAppTheme.palette.error.main}
              </Typography>
            </PaletteBox>
            <PaletteBox
              sx={{
                backgroundColor: crAppTheme.palette.warning.main,
              }}
            >
              <Typography variant="overline">
                Warning {crAppTheme.palette.warning.main}
              </Typography>
            </PaletteBox>
            <PaletteBox
              sx={{
                backgroundColor: crAppTheme.palette.success.main,
              }}
            >
              <Typography variant="overline">
                Success {crAppTheme.palette.success.main}
              </Typography>
            </PaletteBox>
          </Container>
        </Container>

        <Typography variant="h5" sx={{ textAlign: "center", margin: 2 }}>
          Fonts
        </Typography>
        <Container
          sx={{
            width: "70%",
            padding: 3,
            border: `1px dashed ${crAppTheme.palette.primary.light}`,
          }}
        >
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
              Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Id interdum velit laoreet id donec ultrices.
            </Typography>
          </Box>
          <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
            <Typography variant="body2">
              Body 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Id interdum velit laoreet id donec ultrices.
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
        </Container>
        <Typography variant="h5" sx={{ textAlign: "center", margin: 2 }}>
          Buttons
        </Typography>
        <Container
          sx={{
            width: "70%",
            padding: 3,
            border: `1px dashed ${crAppTheme.palette.primary.light}`,
          }}
        >
          <Typography sx={{ textAlign: "center", margin: 1 }}>
            Large Button
          </Typography>
          <Container
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <PrimaryButton>
              <Typography variant="h4" sx={{ textTranform: "capitolize" }}>
                Primary
              </Typography>
            </PrimaryButton>
            <SecondaryButton>
              <Typography variant="h4" sx={{ textTranform: "capitolize" }}>
                Secondary
              </Typography>
            </SecondaryButton>
            <TertiaryButton>
              <Typography variant="h4" sx={{ textTranform: "capitolize" }}>
                Tertiary
              </Typography>
            </TertiaryButton>
          </Container>

          <Typography sx={{ textAlign: "center", margin: 1 }}>
            Medium Button
          </Typography>
          <Container
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <PrimaryButton>
              <Typography variant="body1" sx={{ textTranform: "capitolize" }}>
                Primary
              </Typography>
            </PrimaryButton>
            <SecondaryButton>
              <Typography variant="body1" sx={{ textTranform: "capitolize" }}>
                Secondary
              </Typography>
            </SecondaryButton>
            <TertiaryButton>
              <Typography variant="body1" sx={{ textTranform: "capitolize" }}>
                Tertiary
              </Typography>
            </TertiaryButton>
          </Container>

          <Typography sx={{ textAlign: "center", margin: 1 }}>
            Small Button
          </Typography>
          <Container
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <PrimaryButton>
              <Typography
                variant="subtitle1"
                sx={{ textTranform: "capitolize" }}
              >
                Primary
              </Typography>
            </PrimaryButton>
            <SecondaryButton>
              <Typography
                variant="subtitle1"
                sx={{ textTranform: "capitolize" }}
              >
                Secondary
              </Typography>
            </SecondaryButton>
            <TertiaryButton>
              <Typography
                variant="subtitle1"
                sx={{ textTranform: "capitolize" }}
              >
                Tertiary
              </Typography>
            </TertiaryButton>
          </Container>
        </Container>
        <Typography variant="h5" sx={{ textAlign: "center", margin: 2 }}>
          Avatars
        </Typography>
        <Container
          sx={{
            width: "70%",
            padding: 3,
            border: `1px dashed ${crAppTheme.palette.primary.light}`,
          }}
        >
          Testing...
        </Container>
        <Typography variant="h5" sx={{ textAlign: "center", margin: 2 }}>
          Forms
        </Typography>
        <Container
          sx={{
            width: "70%",
            padding: 3,
            border: `1px dashed ${crAppTheme.palette.primary.light}`,
          }}
        >
          Testing...{" "}
        </Container>

        <Typography variant="h5" sx={{ textAlign: "center", margin: 2 }}>
          Dialogs
        </Typography>
        <Container
          sx={{
            width: "70%",
            padding: 3,
            border: `1px dashed ${crAppTheme.palette.primary.light}`,
          }}
        >
          testing
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default StyleGuide;
