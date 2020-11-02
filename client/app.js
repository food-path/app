import React from "react";
import { connect } from "react-redux";
import Login from "./components/Login";

const App = (props) => {
	return (
		<div>
			<p>{props.user.name}</p>
			<Login />
		</div>
	);
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, null)(App);
