import React, { useEffect } from "react";
import crAppTheme from "../../app/theme";
import {
  PrimaryButton,
  CustomizedTextField,
  TertiaryButton,
} from "../styles/StyleGuide";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Share = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:700px)");

  useEffect(() => {
    const handleClickOutside = (event) => {
      const container = document.getElementById("share-dialog-container");
      if (container && !container.contains(event.target)) {
        navigate("/");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Container
        id="share-dialog-container"
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
        <Link to="/">
          <TertiaryButton sx={{ position: "absolute", top: 0, right: 0 }}>
            <CloseRoundedIcon />
          </TertiaryButton>
        </Link>
        Testing Share
      </Container>
    </ThemeProvider>
  );
};

export default Share;
