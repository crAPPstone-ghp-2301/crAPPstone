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
        id="edit-profile-container"
        sx={{
          position: "fixed",
          top: 0,
          left: "100px",
          zIndex: 1,
          backgroundColor: "white",
          height: "100vh",
          width: isMobile ? "100%" : "450px",
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
