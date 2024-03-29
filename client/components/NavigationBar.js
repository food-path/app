import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store";

import React from "react";

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar id="navbar" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={NavLink} to="/" id="logo-nav">
          <img src="/img/food path mixed logo (alt 1).png" width="200" />
        </Navbar.Brand>
        <Navbar id="basic-navbar-nav">
          <Nav id="mr-auto">
            {this.props.user.id && (
              <>
                <Nav.Link as={NavLink} to="/search">
                  <img
                    src="/icons/search.svg"
                    width="30"
                    className="search-icon"
                  />
                  <p className="search-text">SEARCH</p>
                </Nav.Link>

                <Nav.Link as={NavLink} to="/profile">
                  <img
                    src="/icons/person-circle.svg"
                    width="30"
                    className="profile-icon"
                  />
                  <p className="profile-text">PROFILE </p>
                </Nav.Link>

                <Nav.Link
                  onClick={() => {
                    this.props.logout();
                    this.props.history.push("/");
                  }}
                >
                  <img
                    src="/icons/lock.svg"
                    width="30"
                    className="logout-icon"
                  />
                  <p className="logout-text">LOGOUT </p>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar>
      </Navbar>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
});

const mapDispatch = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default withRouter(connect(mapState, mapDispatch)(NavigationBar));
