import React, { useEffect } from "react";
import crAppTheme from "../../app/theme";
import { PrimaryButton, TertiaryButton } from "../styles/StyleGuide";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const Profile = () => {
  const { id, name, email, username } = useSelector((state) => state.auth.me);
  const token = window.localStorage.getItem("token");
  const isMobile = useMediaQuery("(max-width:1000px)");

  useEffect(() => {
    document.title = `Profile - crAPP Account`;
    const handleClickOutside = (event) => {
      const container = document.getElementById("profile-container");
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
      <Box
        id="profile-container"
        sx={{
          position: "fixed",
          top: 0,
          left: isMobile ? 0 : "100px",
          zIndex: 1,
          backgroundColor: "white",
          width: isMobile ? "100%" : 450,
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
            p: 1,
          }}
        >
          <Box sx={{ p: 1 }}>
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
          <Box sx={{ p: 1 }}>
            <Box sx={{ p: 1 }}>
              <Typography variant="h5">Basic Info</Typography>
            </Box>
            <Box sx={{ p: 1 }}>
              <Typography variant="caption">Username:</Typography>
              <Typography variant="subtitle1">{username}</Typography>
            </Box>
            <Box sx={{ p: 1 }}>
              <Typography variant="caption">Name:</Typography>
              <Typography variant="subtitle1">{name}</Typography>
            </Box>
            <Box sx={{ p: 1 }}>
              <Typography variant="caption">Email:</Typography>
              <Typography variant="subtitle1">{email}</Typography>
            </Box>
          </Box>
          <Box sx={{ p: 1 }}>
            <Box sx={{ p: 1 }}>
              <Typography variant="h5">Password</Typography>
            </Box>
            <Box sx={{ p: 1 }}>
              <Typography variant="caption">Your secure password</Typography>
              <Typography variant="subtitle1">*****</Typography>
            </Box>
          </Box>
          <Box sx={{ p: 1 }}>
            <Box sx={{ p: 1 }}>
              <Typography variant="h5">Profile Image</Typography>
            </Box>
            <Box sx={{ p: 1 }}>
              <Avatar>
                <Typography sx={{ textTransform: "capitalize" }}>
                  {username[0]}
                </Typography>
              </Avatar>
            </Box>
          </Box>
          <Link to="/editprofile">
            <PrimaryButton sx={{ my: 4 }}>
              <EditRoundedIcon />
              <Typography variant="caption" sx={{ fontWeight: 800, px: 2 }}>
                Edit Profile
              </Typography>
            </PrimaryButton>
          </Link>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Profile;
