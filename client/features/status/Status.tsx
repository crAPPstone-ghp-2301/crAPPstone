import React, { useState } from "react";
import crAppTheme from "../../app/theme";
import { TertiaryButton } from "../styles/StyleGuide";
import { Link } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Status = () => {
  const [closed, setClosed] = useState(false);

  const handleClose = () => {
    setClosed(true);
  };

  if (closed) {
    return null;
  }

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Container
        maxWidth={false}
        sx={{
          width: "100%",
          backgroundColor: crAppTheme.palette.primary.dark,
          color: crAppTheme.palette.primary.light,
          display: "flex",
          flexDirection: "row",
          zIndex: 9999,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: "center",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <marquee>
          <Typography variant="caption">
            Currently in a "crappy" relationship with New York City 🍎 ! We're
            "flushed" 🚽 with excitement to expand to your city too. Help us
            "plunge" 🪠 into new territories by giving us{" "}
            <a
              href="https://forms.gle/VEVg2ZZbKBEiNTSE6"
              target="_blank"
              style={{ textTransform: "none" }}
            >
              your feedback!
            </a>
          </Typography>
        </marquee>
        <Link to="/">
          <TertiaryButton
            onClick={handleClose}
            fontSize="sm"
            sx={{ color: crAppTheme.palette.primary.light }}
          >
            <CloseRoundedIcon fontSize="sm" />
          </TertiaryButton>
        </Link>
      </Container>
    </ThemeProvider>
  );
};

export default Status;
