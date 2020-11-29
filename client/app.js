import React from "react";
import { connect } from "react-redux";
import { NavigationBar } from "./components";
import Routes from "./routes";

const App = (props) => {
	return (
		<div>
			<NavigationBar />
			<Routes />
		</div>
	);
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, null)(App);
