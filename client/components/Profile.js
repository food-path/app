import React from "react";
import { connect } from "react-redux";

class Profile extends React.Component {
	render() {
		return <div>Hello, {this.props.user.name}</div>;
	}
}

const mapState = (state) => ({
	user: state.user,
});

export default connect(mapState, null)(Profile);
