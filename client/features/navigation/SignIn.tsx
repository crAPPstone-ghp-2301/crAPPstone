import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, Route, Routes } from "react-router-dom";
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
  Typography,
  Button,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { logout } from "../../app/store";
import AuthForm from "../auth/AuthForm";

const SignIn = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const { username } = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  const toggleButton = () => {
    setIsLogin(!isLogin);
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <Container>
        <PrimaryButton onClick={toggleDialog} sx={{ px: 2, py: 1 }}>
          <Typography variant="overline">Sign In</Typography>
        </PrimaryButton>
        <Dialog open={isOpen} onClose={toggleDialog}>
          <DialogTitle>
            <Typography sx={{ alignItem: "center" }}>
              {isLoggedIn ? (
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 10,
                  }}
                >
                  <Typography variant="body1">🎉🎉🎉</Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: crAppTheme.palette.primary.dark }}
                  >
                    Welcome Back!
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ m: 4, color: crAppTheme.palette.primary.dark }}
                  >
                    {username}
                  </Typography>
                  <Typography variant="body1">🎉🎉🎉</Typography>
                </Container>
              ) : (
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ color: crAppTheme.palette.primary.dark }}
                  >
                    We're excited to have you join us.
                  </Typography>
                </Container>
              )}
            </Typography>
          </DialogTitle>
          <DialogContent>
            {!isLoggedIn && (
              <Routes>
                <Route
                  path="/login"
                  element={
                    <AuthForm
                      name="login"
                      displayName="Log In"
                      oppositeName="Create Account"
                    />
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <AuthForm
                      name="signup"
                      displayName="Create Account"
                      oppositeName="Log In"
                    />
                  }
                />
              </Routes>
            )}
          </DialogContent>
          <DialogActions>
            <CloseRoundedIcon
              onClick={toggleDialog}
              sx={{ position: "absolute", top: 0, right: 0, mx: 2, my: 1 }}
            />
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
