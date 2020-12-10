import React from "react";
import { connect } from "react-redux";
import { register } from "../store";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.auth(this.state);
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    this.props.history.push("/profile");
  }

  render() {
    return (
      <>
        <div id="picture-bg">
          <div id="purple-bg">
            <img src="/img/logo2.png" width="90" className="logo-signup" />

            <p className="welcome-msg">
              Welcome to Food Path! <br></br>Tell us a little bit about
              yourself.
            </p>

            <Form.Group onSubmit={this.onSubmit} className="content-signup">
              <Form.Control
                className="firstname"
                name="firstName"
                type="text"
                placeholder="First name"
                value={this.state.firstName}
                onChange={this.onChange}
              />
              <Form.Control
                className="lastname"
                name="lastName"
                type="text"
                placeholder="Last name"
                value={this.state.lastName}
                onChange={this.onChange}
              />
              <Form.Control
                className="email"
                name="email"
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onChange}
              />
              <Form.Control
                className="password"
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChange}
              />
              <Button id="btn-signup" type="submit" onClick={this.onSubmit}>
                Sign Up
              </Button>
            </Form.Group>

            <Form method="get" action="/auth/google" id="form-google-btn">
              <Button id="btn-google" type="submit">
                Sign up with Google
              </Button>

              <Button id="btn-already-account" type="submit">
                <Link to="/login">Already a member? Sign in here</Link>
              </Button>
            </Form>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  auth: (body) => dispatch(register(body)),
});

export default connect(null, mapDispatchToProps)(Registration);
