import React, { useState, useEffect } from "react";
import crAppTheme from "../../app/theme";
import {
  CustomizedTextField,
  PrimaryButton,
  TertiaryButton,
} from "../styles/StyleGuide";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../auth/authSlice";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { me } = useSelector((state) => state.auth);
  const isMobile = useMediaQuery("(max-width:1000px)");

  const { id, name, email, username, password } = useSelector(
    (state) => state.auth.me
  );
  const token = window.localStorage.getItem("token");
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInfoEdit = (event) => {
    event.preventDefault();

    const updatedInfo = {
      id,
      username: event.target.username.value,
      name: event.target.name.value,
      email: event.target.email.value,
    };

    dispatch(updateUser(updatedInfo)).then(() => {
      window.location.reload();
      navigate("/profile");
      window.location.reload();
    });
  };

  const handlePasswordEdit = (event) => {
    event.preventDefault();

    const newPassword = event.target.newPassword.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    const updatedPassword = {
      id,
      password: newPassword,
    };

    dispatch(updateUser(updatedPassword)).then(() => {
      setError(null);
      navigate("/profile", { replace: true });
    });
  };

  useEffect(() => {
    document.title = `Edit Profile - crAPP Account`;
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
        </Container>
        <Container>
          <Box sx={{ borderBottom: 1, borderColor: "divider", my: 2 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="primary"
              indicatorColor="secondary"
              centered
              sx={{
                "& .Mui-selected": {
                  backgroundColor: crAppTheme.palette.primary.dark,
                },
              }}
            >
              <Tab label="Basic Info" />
              <Tab label="Password" />
              <Tab label="Profile Image" />
            </Tabs>
          </Box>
          {activeTab === 0 && (
            <form onSubmit={handleInfoEdit}>
              <Box sx={{ py: 3 }}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h5">Basic Info</Typography>
                </Box>
                <CustomizedTextField
                  label="Username"
                  name="username"
                  helperText="Required Input"
                  defaultValue={username}
                  required
                  fullWidth
                  sx={{ width: isMobile ? 300 : "auto" }}
                />
                <CustomizedTextField
                  label="Name"
                  name="name"
                  defaultValue={name}
                  fullWidth
                  sx={{ width: isMobile ? 300 : "auto" }}
                />
                <CustomizedTextField
                  label="Email"
                  name="email"
                  type="email"
                  helperText="Required Input"
                  defaultValue={email}
                  required
                  fullWidth
                  sx={{ width: isMobile ? 300 : "auto" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingBottom: 4,
                }}
              >
                <PrimaryButton type="submit">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 800, px: 2 }}
                  >
                    Save
                  </Typography>
                </PrimaryButton>
                <Link to="/profile">
                  <TertiaryButton sx={{ mx: 2, p: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 800, px: 2 }}
                    >
                      Cancel
                    </Typography>
                  </TertiaryButton>
                </Link>
              </Box>
            </form>
          )}
          {activeTab === 1 && (
            <form onSubmit={handlePasswordEdit}>
              <Box sx={{ py: 3 }}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h5">Password</Typography>
                </Box>
                <CustomizedTextField
                  label="New Password"
                  name="newPassword"
                  type="password"
                  helperText="Required Input"
                  required
                  fullWidth
                  sx={{ width: isMobile ? 300 : "auto" }}
                />
                <CustomizedTextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  helperText="Required Input"
                  required
                  fullWidth
                  sx={{ width: isMobile ? 300 : "auto" }}
                />
              </Box>
              {error && (
                <Typography
                  variant="subtitle2"
                  color="error"
                  sx={{ textTransform: "capitalize" }}
                >
                  {error}
                </Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingBottom: 4,
                }}
              >
                <PrimaryButton type="submit">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 800, px: 2 }}
                  >
                    Save
                  </Typography>
                </PrimaryButton>
                <Link to="/profile">
                  <TertiaryButton sx={{ mx: 2, py: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 800, px: 2 }}
                    >
                      Cancel
                    </Typography>
                  </TertiaryButton>
                </Link>
              </Box>
            </form>
          )}
          {activeTab === 2 && (
            <form>
              <Box sx={{ py: 3 }}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h5">Profile Image</Typography>
                </Box>
                <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
                  <Avatar>
                    <Typography sx={{ textTransform: "capitalize" }}>
                      {username[0]}
                    </Typography>
                  </Avatar>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingBottom: 4,
                }}
              >
                <PrimaryButton type="submit">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 800, px: 2 }}
                  >
                    Save
                  </Typography>
                </PrimaryButton>
                <Link to="/profile">
                  <TertiaryButton sx={{ mx: 2, py: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 800, px: 2 }}
                    >
                      Cancel
                    </Typography>
                  </TertiaryButton>
                </Link>
              </Box>
            </form>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default EditProfile;
