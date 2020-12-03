import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Profile extends React.Component {
	render() {
		return (
			<div>
				Hello, {this.props.user.firstName}!
				<p>
					Been fooding since: {this.props.user.registrationDate.toDateString()}
				</p>
				<p>
					<Link to="/myMaps">Go To My Saved Maps</Link>
				</p>
			</div>
		);
	}
}

const mapState = (state) => ({
	user: state.user,
});

export default connect(mapState, null)(Profile);
