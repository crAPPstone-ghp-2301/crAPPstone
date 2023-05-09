import React, { useState } from "react";
import crAppTheme from "../../app/theme";
import { PrimaryButton, TertiaryButton } from "../styles/StyleGuide";
import {
  ThemeProvider,
  Container,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, Route, Routes } from "react-router-dom";
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

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <Link to="/login">
        <PrimaryButton onClick={toggleDialog} sx={{ px: 1, py: 0.5 }}>
          <Typography variant="overline">
            {isLoggedIn ? "Sign Out" : "Sign In"}
          </Typography>
        </PrimaryButton>
      </Link>
      <Dialog open={isOpen} onClose={toggleDialog}>
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
              <Box sx={{ marginTop: 5 }}>
                <PrimaryButton type="button" onClick={logoutAndRedirectHome}>
                  Logout
                </PrimaryButton>
              </Box>
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
          <TertiaryButton
            onClick={toggleDialog}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseRoundedIcon />
          </TertiaryButton>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default SignIn;
