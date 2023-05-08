import React from "react";
import crAppTheme from "../../app/theme";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../../app/store";
import {
  PrimaryButton,
  CustomizedTextField,
  TertiaryButton,
} from "../styles/StyleGuide";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName, oppositeName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={{ marginTop: 4 }}>
          Welcome to crAPP
        </Typography>
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
    </ThemeProvider>
  );
};

export default AuthForm;
