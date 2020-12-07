import React from "react";
import { connect } from "react-redux";
import { register } from "../store";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
  }

  render() {
    return (
      <>
        <div id="purple-bg">
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
            <Button id="btn-signup" variant="primary" type="submit">
              Sign Up
            </Button>
          </Form.Group>

          <Form method="get" action="/auth/google">
            <Button id="btn-google" type="submit">
              Signup with Google
            </Button>

          </Form>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  auth: (body) => dispatch(register(body)),
});

export default connect(null, mapDispatchToProps)(Registration);
