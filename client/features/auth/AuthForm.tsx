import React from "react";
import crAppTheme from "../../app/theme";
import {
  ThemeProvider,
  Box,
  Typography,
  CssBaseline,
  Container,
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
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 3,
            }}
          >
            <Box>
              <Link to={name === "login" ? "/signup" : "/login"}>
                <TertiaryButton
                  sx={{
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  <Typography variant="overline">{oppositeName}</Typography>
                </TertiaryButton>
              </Link>
            </Box>
            <Box>
              <PrimaryButton type="submit" sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle1">Submit</Typography>
              </PrimaryButton>
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
