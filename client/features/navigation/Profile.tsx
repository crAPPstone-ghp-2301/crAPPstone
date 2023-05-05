import React, { useState } from "react";
import crAppTheme from "../../app/theme";
import { PrimaryButton, TertiaryButton } from "../styles/StyleGuide";
import {
  ThemeProvider,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, Route, Routes } from "react-router-dom";
import { logout } from "../../app/store";
import AuthForm from "../auth/AuthForm";

const Profile = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 2,
          margin: 0,
          padding: 0,
        }}
      >
        <PrimaryButton onClick={toggleDialog}>
          Sign In/ Create Account
        </PrimaryButton>
        <Dialog open={isOpen} onClose={toggleDialog}>
          <DialogTitle>
            {isLoggedIn ? "Welcome Back!" : "Create an Account"}
          </DialogTitle>
          <DialogContent>
            {isLoggedIn ? (
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/* The Profile will show these links after you log in */}
                <Box sx={{ mr: 2 }}>
                  <Link to="/home">Home</Link>
                </Box>
                <Box>
                  <TertiaryButton type="button" onClick={logoutAndRedirectHome}>
                    Logout
                  </TertiaryButton>
                </Box>
              </Container>
            ) : (
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/* The Profile will show these links before you log in */}
                <Box
                  sx={{
                    mr: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Link to="/login">
                    <TertiaryButton>Login</TertiaryButton>
                  </Link>
                </Box>
                <Box>
                  <Link to="/signup">
                    <TertiaryButton>Sign Up</TertiaryButton>
                  </Link>
                </Box>
              </Container>
            )}

            {!isLoggedIn && (
              <Routes>
                <Route
                  path="/login"
                  element={<AuthForm name="login" displayName="Login" />}
                />
                <Route
                  path="/signup"
                  element={<AuthForm name="signup" displayName="Sign Up" />}
                />
              </Routes>
            )}
          </DialogContent>
          <DialogActions>
            <TertiaryButton onClick={toggleDialog}>Close</TertiaryButton>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
