import React, { useEffect } from "react";
import crAppTheme from "../../app/theme";
import { PrimaryButton, TertiaryButton } from "../styles/StyleGuide";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const EditProfile = () => {
  const { id, name, email, isAdmin, username, password } = useSelector(
    (state) => state.auth.me
  );

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
          }}
        >
          <Box sx={{ py: 2 }}>
            <Typography variant="h3">Personal Profile</Typography>
            <Typography variant="subtitle1">
              Info about you and your preferences on crAPP
            </Typography>
          </Box>
          <Link to="/">
            <TertiaryButton sx={{ position: "absolute", top: 0, right: 0 }}>
              <CloseRoundedIcon />
            </TertiaryButton>
          </Link>
          <Box sx={{ py: 2 }}>
            <Typography variant="h5">Basic Info</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", py: 2 }}>
            <Typography variant="subtitle1">Username:</Typography>
            <Typography variant="body1">{username}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", py: 2 }}>
            <Typography variant="subtitle1">Name:</Typography>
            <Typography variant="body1">{name}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", py: 2 }}>
            <Typography variant="subtitle1">Email:</Typography>
            <Typography variant="body1">{email}</Typography>
          </Box>
          <Box sx={{ py: 2 }}>
            <Typography variant="h5">Password</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", py: 2 }}>
            <Typography variant="subtitle1">Your secure password</Typography>
            <Typography variant="body1">*****</Typography>
          </Box>
          <PrimaryButton sx={{ my: 4 }}>Edit Profile</PrimaryButton>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default EditProfile;
