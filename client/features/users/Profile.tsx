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
import { useSelector } from "react-redux";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const Profile = () => {
  const { id, name, email, username } = useSelector((state) => state.auth.me);
  const token = window.localStorage.getItem("token");

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
        id="profile-container"
        sx={{
          position: "fixed",
          top: 0,
          left: "100px",
          zIndex: 1,
          backgroundColor: "white",
          width: 450,
          height: "100%",
          overflowY: "scroll",
          paddingBottom: 10,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: 10,
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
            <TertiaryButton sx={{ position: "absolute", top: 80, right: 0 }}>
              <CloseRoundedIcon />
            </TertiaryButton>
          </Link>
          <Box sx={{ py: 2 }}>
            <Box sx={{ py: 2 }}>
              <Typography variant="h5">Basic Info</Typography>
            </Box>
            <Box sx={{ py: 2 }}>
              <Typography variant="subtitle1">Username:</Typography>
              <Typography variant="body1">{username}</Typography>
            </Box>
            <Box sx={{ py: 2 }}>
              <Typography variant="subtitle1">Name:</Typography>
              <Typography variant="body1">{name}</Typography>
            </Box>
            <Box sx={{ py: 2 }}>
              <Typography variant="subtitle1">Email:</Typography>
              <Typography variant="body1">{email}</Typography>
            </Box>
          </Box>
          <Box sx={{ py: 2 }}>
            <Box sx={{ py: 2 }}>
              <Typography variant="h5">Password</Typography>
            </Box>
            <Box sx={{ py: 2 }}>
              <Typography variant="subtitle1">Your secure password</Typography>
              <Typography variant="body1">*****</Typography>
            </Box>
          </Box>
          <Box sx={{ py: 2 }}>
            <Box sx={{ py: 2 }}>
              <Typography variant="h5">Profile Image</Typography>
            </Box>
          </Box>
          <Link to="/editprofile">
            <PrimaryButton sx={{ my: 4 }}>
              <EditRoundedIcon />
              <Typography variant="subtitle1" sx={{ fontWeight: 800, px: 2 }}>
                Edit Profile
              </Typography>
            </PrimaryButton>
          </Link>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
