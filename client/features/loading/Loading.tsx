import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import crAppTheme from "../../app/theme";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  useMediaQuery,
  Typography,
} from "@mui/material";

const Loading = ({ loadingGif }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Container
        id="loading-container"
        sx={{
          position: "fixed",
          top: 0,
          left: isMobile ? 0 : "100px",
          zIndex: isMobile ? 2 : 1,
          backgroundColor: "white",
          width: isMobile ? "100%" : 450,
          height: "100%",
          padding: isMobile ? "20px" : "0",
          overflowY: isMobile ? "auto" : "hidden",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            py: 2,
          }}
        >
          {loadingGif ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={loadingGif} alt="Loading..." />
              <Typography
                variant="h6"
                sx={{ color: "text.secondary", marginTop: 1 }}
              >
                Loading...
              </Typography>
            </Box>
          ) : (
            <CircularProgress color="secondary" />
          )}
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default Loading;
