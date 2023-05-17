import React from "react";
import crAppTheme from "../../app/theme";
import { TertiaryButton } from "../styles/StyleGuide";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Share = () => {
  const isMobile = useMediaQuery("(max-width:700px)");

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Container
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
