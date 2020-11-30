import React from "react";
import { connect } from "react-redux";
import { auth } from "../store";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
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
      name: "",
      password: "",
    });
  }

  render() {
    return (
      <div className="col-md-4 col-sm-4 col-xs-12">
        <div className="bg-login">
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="userInput">
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter Username"
                value={this.state.name}
                onChange={this.onChange}
              />

              <Form.Control
                name="password"
                type="password"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={this.onChange}
              />

              <Button variant="primary" type="submit" size="md" block>
                Let's Eat!
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  auth: (body) => dispatch(auth(body)),
});

export default connect(null, mapDispatchToProps)(Login);
