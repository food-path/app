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
					Food Path
				</Navbar.Brand>
				<Navbar id="basic-navbar-nav">
					<Nav id="mr-auto">
						{/* <Nav.Link as={NavLink} to="/">
              <img src="./icons/house.svg" width="30" className="home-icon" />
              <p className="home-text">Home</p>
            </Nav.Link> */}
						{this.props.user.id && (
							<>
								<Nav.Link as={NavLink} to="/search">
									<img
										src="/icons/search.svg"
										width="30"
										className="search-icon"
									/>
									<p className="search-text">Search</p>
								</Nav.Link>

								{/* <Nav.Link as={NavLink} to="/map">
                  <img
                    src="./icons/compass.svg"
                    width="30"
                    className="map-icon"
                  />
                  <p className="map-text">Map </p>
                </Nav.Link> */}

								<Nav.Link as={NavLink} to="/profile">
									<img
										src="/icons/person-circle.svg"
										width="30"
										className="profile-icon"
									/>
									<p className="profile-text">Profile </p>
								</Nav.Link>

								<Nav.Link
									onClick={() => {
										this.props.logout();
										this.props.history.push("/");
									}}
								>
									<img
										src="/icons/door-closed.svg"
										width="30"
										className="logout-icon"
									/>
									<p className="logout-text">Logout </p>
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
