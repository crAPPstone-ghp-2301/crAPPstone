import React, { useState } from "react";
import crAppTheme from "../../app/theme";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { TertiaryButton } from "../styles/StyleGuide";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const NotFound = () => {
  const isMobile = useMediaQuery("(max-width:700px)");

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Container
        id="add-review-container"
        sx={{
          position: "absolute",
          zIndex: 1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF",
          p: 4,
          width: isMobile ? "100%" : "30%",
          textAlign: "center",
        }}
      >
        <Link to={`/`}>
          <TertiaryButton sx={{ position: "absolute", top: 0, right: 0 }}>
            <CloseRoundedIcon />
          </TertiaryButton>
        </Link>

        <Box sx={{ p: 2 }}>
          <Box sx={{ alignItems: "center" }}>
            <img
              src="https://media1.giphy.com/media/3o7TKnxVWUDneZi09i/200w.webp?cid=ecf05e47el3q3tem2i7pq20aqx49lwav0vfvwp02k2wltwzw&ep=v1_gifs_related&rid=200w.webp&ct=g"
              alt="click X to close"
              width="200px"
            />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="secondary.light">
              Page not found!
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default NotFound;
