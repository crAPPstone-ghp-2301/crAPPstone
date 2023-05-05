import React, { useState } from "react";
import crAppTheme from "../../app/theme";
import {
  ThemeProvider,
  Container,
  Button,
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          contentAlign: "right",
          alignItems: "right",
        }}
      >
        <Button onClick={toggleDialog}>Sign In/ Create Account</Button>
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
                  <Button type="button" onClick={logoutAndRedirectHome}>
                    Logout
                  </Button>
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
                <Box sx={{ mr: 2 }}>
                  <Link to="/login">Login</Link>
                </Box>
                <Box>
                  <Link to="/signup">Sign Up</Link>
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
            <Button onClick={toggleDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default Profile;
