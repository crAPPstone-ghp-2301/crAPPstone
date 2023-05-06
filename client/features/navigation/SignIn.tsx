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
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Route, Routes } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
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
      <PrimaryButton onClick={toggleDialog} sx={{ px: 1, py: 0.5 }}>
        <Typography variant="overline">Sign In</Typography>
      </PrimaryButton>
      <Dialog open={isOpen} onClose={toggleDialog}>
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
