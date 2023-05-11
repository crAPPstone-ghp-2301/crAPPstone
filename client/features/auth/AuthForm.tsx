import React, { useRef } from "react";
import crAppTheme from "../../app/theme";
import {
  PrimaryButton,
  CustomizedTextField,
  TertiaryButton,
} from "../styles/StyleGuide";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authenticate, logout } from "../../app/store";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName, oppositeName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.auth.me);
  const { error } = useSelector((state) => state.auth);
  const isMobile = useMediaQuery("(max-width:700px)");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
  };

  const isLoggedIn = useSelector((state) => {
    const { me, authToken } = state.auth;
    const storedAuthToken = localStorage.getItem("authToken");
    const storedUserId = sessionStorage.getItem("userId");
    return (
      me.id ||
      (authToken && storedAuthToken === authToken) ||
      (storedUserId && me.id === storedUserId)
    );
  });

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Container
        sx={{
          position: "absolute",
          zIndex: 1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF",
          p: 4,
          width: isMobile ? "100%" : "30%",
          height: "550px",
          textAlign: "center",
        }}
      >
        <Link to="/">
          <TertiaryButton sx={{ position: "absolute", top: 0, right: 0 }}>
            <CloseRoundedIcon />
          </TertiaryButton>
        </Link>
        {isLoggedIn ? (
          <Container>
            <Typography variant="body1">🎉</Typography>
            <Typography
              variant="body1"
              sx={{ color: crAppTheme.palette.primary.dark }}
            >
              Welcome Back!
            </Typography>
            <Typography
              variant="h5"
              sx={{ m: 4, color: crAppTheme.palette.primary.dark, mb: 6 }}
            >
              {username}
            </Typography>
            <Box>
              <Link to="/">
                <TertiaryButton>Start Exploring</TertiaryButton>
              </Link>
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <Link to="/editprofile">
                <PrimaryButton>Manage Account</PrimaryButton>
              </Link>
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <TertiaryButton type="button" onClick={logoutAndRedirectHome}>
                Logout
              </TertiaryButton>
            </Box>
          </Container>
        ) : (
          <Container>
            <Typography variant="h3" sx={{ marginTop: 4 }}>
              Welcome to crAPP
            </Typography>
            <img
              src="https://em-content.zobj.net/source/animated-noto-color-emoji/356/pile-of-poo_1f4a9.gif"
              width="50px"
            />
            <form onSubmit={handleSubmit} name={name}>
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  padding: 4,
                  color: crAppTheme.palette.text.secondary,
                }}
              >
                {displayName}
              </Typography>
              <Box>
                <CustomizedTextField
                  label="Username"
                  name="username"
                  required
                  fullWidth
                />
              </Box>
              <Box>
                <CustomizedTextField
                  label="Password"
                  name="password"
                  type="password"
                  required
                  fullWidth
                />
              </Box>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Link to={name === "login" ? "/signup" : "/login"}>
                      <TertiaryButton>
                        <Typography
                          variant="overline"
                          sx={{ textAlign: "center", lineHeight: "15px" }}
                        >
                          {oppositeName}
                        </Typography>
                      </TertiaryButton>
                    </Link>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <PrimaryButton type="submit" sx={{ px: 2, py: 1 }}>
                      <Typography variant="subtitle1">{name}</Typography>
                    </PrimaryButton>
                  </Box>
                </Box>
              </Container>
              <Box>
                {error && (
                  <Typography
                    variant="overline"
                    sx={{ color: crAppTheme.palette.error.main }}
                  >
                    {error}
                  </Typography>
                )}
              </Box>
            </form>
          </Container>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default AuthForm;
