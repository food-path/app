import React from "react";
import { connect } from "react-redux";
import { Login, Map } from "./components";
import Routes from "./routes";

const App = (props) => {
	return (
		<div>
			<Routes />
			<Login />
			<Map />
		</div>
	);
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, null)(App);
