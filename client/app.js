import React from "react";
import { connect } from "react-redux";
import { Login, Map } from "./components";

const App = (props) => {
	return (
		<div>
			<Map />
			<p>{props.user.name}</p>
			<Login />
		</div>
	);
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, null)(App);
