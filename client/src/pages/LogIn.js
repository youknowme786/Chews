import React, { Component } from "react";
import Container from "../components/Container";
import { Logo } from "../components/Logo";
import LogInForm from "../components/LogInForm";

class LogIn extends Component {
  state = {
    email: "",
    password: ""
  };

  render() {
    return (
      <Container column margin="35vh">
        <Logo large />
        <LogInForm />
      </Container>
    );
  }
}

export default LogIn;