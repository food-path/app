import React from "react";
import { connect } from "react-redux";
import { auth } from "../store";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
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
    // this.props.auth(this.state);
    this.setState({
      email: "",
      password: "",
    });
  }

  render() {
    const { handleClick, isLoggedIn } = this.props;

    return (
      <div className="container-login">
        <img src="/img/logo2.png" width="90" className="logo-login" />

        <div className="square"></div>

        <div className="form-container">
          <div className="col-md-4 col-sm-4 col-xs-12">

            <Form.Control
              id="input-email"
              name="email"
              type="text"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={this.onChange}
            />

            <Form.Control
              id="input-password"
              name="password"
              type="password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.onChange}
            />

            <Button
              id="btn1"
              href="/search"
              variant="info"
              type="submit"
              size="md"
              block
              onClick={this.onSubmit}
            >
              Let's Eat!
            </Button>

            <form method="get" action="/auth/google">
              <Button id="btn3" type="submit" variant="primary">
                <img
                  src="./img/google.png"
                  width="15"
                  className="google-icon"
                />{" "}
                Sign in with Google
              </Button>
            </form>

            <div>
              <Button
                id="btn2"
                href="/registration"
                variant="info"
                type="submit"
                size="sm"
                block
                onClick={handleClick}
              >
                New here? Get on a Food Path!
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {},
    getUser: () => dispatch({ type: "GET_USER" }),
  };
};

const loggedinUser = connect(mapState, mapDispatch)(Login);
export default withRouter(loggedinUser);

/**
 * PROP TYPES
 */
Login.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
