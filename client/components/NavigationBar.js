import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import NavItem from "react-bootstrap/NavItem";
import { UserHome } from "./UserHome";
import { logout } from "../store";
import { connect } from "react-redux";
import React from "react";


class NavigationBar extends React.Component {
  render() {

    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={NavLink} to="/">
          Food Path
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/search">
              Search
            </Nav.Link>
            <Nav.Link as={NavLink} to="/map">
              Map
            </Nav.Link>
            <Button
            type="button"
            class="btn btn-link" 
            onClick={this.props.handleClick}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(null, mapDispatch) (NavigationBar);
