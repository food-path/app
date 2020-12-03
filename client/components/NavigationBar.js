import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, Link, withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import NavItem from "react-bootstrap/NavItem";
import { UserHome } from "./UserHome";
import { connect } from "react-redux";
import { logout } from "../store";

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

						{this.props.user.id && (
							<>
								<Nav.Link as={NavLink} to="/search">
									Search
								</Nav.Link>
								<Nav.Link as={NavLink} to="/map">
									Map
								</Nav.Link>
								<Nav.Link as={NavLink} to="/profile">
									Profile
								</Nav.Link>
								<Nav.Link
									onClick={() => {
										this.props.logout();
										this.props.history.push("/");
									}}
								>
									Logout
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
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
