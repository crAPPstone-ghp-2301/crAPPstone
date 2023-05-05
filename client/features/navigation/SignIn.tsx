import React, { useState } from "react";
import crAppTheme from "../../app/theme";
import { PrimaryButton, TertiaryButton } from "../styles/StyleGuide";
import {
  ThemeProvider,
  Container,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, Route, Routes } from "react-router-dom";
import { logout } from "../../app/store";
import AuthForm from "../auth/AuthForm";

const SignIn = () => {
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
          position: "absolute",
          top: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          zIndex: 1,
        }}
      >
        <PrimaryButton
          onClick={toggleDialog}
          sx={{
            py: 1,
            px: 2,
          }}
        >
          <Typography variant="overline" sx={{ fontWeight: 700 }}>
            Sign In
          </Typography>
        </PrimaryButton>
        <Dialog open={isOpen} onClose={toggleDialog}>
          <Container sx={{ py: 4 }}>
            <DialogTitle sx={{ textAlign: "center" }}>
              <Typography variant="h3">
                {isLoggedIn ? "Welcome Back" : "Create Account"}
              </Typography>
            </DialogTitle>
            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
              to continue to crApp the Map
            </Typography>
            <DialogContent>
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
            <DialogActions
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
            >
              <IconButton onClick={toggleDialog}>
                <Close />
              </IconButton>
            </DialogActions>
          </Container>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
