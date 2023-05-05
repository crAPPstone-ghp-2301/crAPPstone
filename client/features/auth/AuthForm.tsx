import React from "react";
import crAppTheme from "../../app/theme";
import { ThemeProvider, Container, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, CustomizedTextField } from "../styles/StyleGuide";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
    navigate("/");
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit} name={name} style={{ padding: 4 }}>
          <Container>
            <CustomizedTextField label="Username" name="username" required />
          </Container>
          <Container>
            <CustomizedTextField label="Name" name="name" />
          </Container>
          <Container>
            <CustomizedTextField label="Email" name="email" type="email" />
          </Container>
          <Container>
            <CustomizedTextField
              label="Password"
              name="password"
              type="password"
              required
            />
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              my: 2,
            }}
          >
            <PrimaryButton type="submit">{displayName}</PrimaryButton>
          </Container>
          <Typography
            variant="overline"
            sx={{
              color: crAppTheme.palette.error.main,
              fontWeight: 600,
            }}
          >
            {error && <Container> {error} </Container>}
          </Typography>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default AuthForm;
