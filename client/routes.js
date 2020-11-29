import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { Login, Map, Registration, Search } from "./components";
import { fetchMarkers } from "./store";

class Routes extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Registration} />
				<Route exact path="/search" component={Search} />
				<Route exact path="/map" component={Map} />
			</Switch>
		);
	}
}

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
// Routes.propTypes = {
// 	loadInitialData: PropTypes.func.isRequired,
// 	// isLoggedIn: PropTypes.bool.isRequired
// };
