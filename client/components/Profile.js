import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { logout } from "../store";

class Profile extends React.Component {
	render() {
		const user = this.props.user;
		return (
			<div>
				<img src={user.imageUrl} width="100px" />
				<p>Hello, {user.firstName}!</p>
				<p>
					Been fooding since:{" "}
					{new Date(user.registrationDate).toLocaleDateString()}
				</p>
				<p>
					<Link to="/myMaps">Go To My Saved Maps</Link>
				</p>
				<p>
					<Link to="/editProfile">Edit My Profile</Link>
				</p>
				<Button
					onClick={() => {
						this.props.logout();
						this.props.history.push("/");
					}}
				>
					Logout
				</Button>
			</div>
		);
	}
}

const mapState = (state) => ({
	user: state.user,
});

const mapDispatch = (dispatch) => ({
	logout: () => dispatch(logout()),
});

export default withRouter(connect(mapState, mapDispatch)(Profile));
