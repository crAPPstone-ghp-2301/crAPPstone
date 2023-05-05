import React from "react";
import crAppTheme from "../../app/theme";
import { ThemeProvider, Container, Button, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { PrimaryButton, CustomizedTextField } from "../styles/StyleGuide";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
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
      <form onSubmit={handleSubmit} name={name}>
        <Container>
          <CustomizedTextField label="Username" name="username" />
        </Container>
        <Container>
          <CustomizedTextField
            label="Password"
            name="password"
            type="password"
          />
        </Container>
        <Container>
          <PrimaryButton type="submit">{displayName}</PrimaryButton>
        </Container>
        {error && <Container> {error} </Container>}
      </form>
    </ThemeProvider>
  );
};

export default AuthForm;
