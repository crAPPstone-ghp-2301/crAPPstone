import React, { useEffect } from "react";
import crAppTheme from "../../app/theme";
import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
} from "../styles/StyleGuide";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const EditProfile = () => {
  const { me } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const container = document.getElementById("edit-profile-container");
      if (container && !container.contains(event.target)) {
        window.location.href = "/";
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
        id="edit-profile-container"
        sx={{
          position: "fixed",
          top: 0,
          left: "100px",
          zIndex: 1,
          backgroundColor: "white",
          height: "100%",
          width: 450,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            py: 2,
            marginBottom: 2,
          }}
        >
          <Box sx={{ py: 2 }}>
            <Typography variant="h3">Edit Profile</Typography>
            <Typography variant="subtitle1">
              Change your preferences on crAPP
            </Typography>
          </Box>
          <Link to="/">
            <TertiaryButton sx={{ position: "absolute", top: 0, right: 0 }}>
              <CloseRoundedIcon />
            </TertiaryButton>
          </Link>
          <Box sx={{ py: 2 }}>
            <Box sx={{ py: 2 }}>
              <Typography variant="h5">Basic Info</Typography>
            </Box>
          </Box>
          <Box sx={{ py: 2 }}>
            <Box sx={{ py: 2 }}>
              <Typography variant="h5">Password</Typography>
            </Box>
          </Box>
        </Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <PrimaryButton>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, px: 2 }}>
              Save
            </Typography>
          </PrimaryButton>
          <Link to="/profile">
            <TertiaryButton sx={{ mx: 2, py: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, px: 2 }}>
                Cancel
              </Typography>
            </TertiaryButton>
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EditProfile;
