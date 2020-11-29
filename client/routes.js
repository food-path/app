import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { Login, Map, Registration, Search } from "./components";
import { fetchMarkers } from "./store";

class Routes extends Component {
	constructor() {
		super();
		this.state = {
			location: "",
		};
	}

	componentDidMount() {
		this.props.getMarkers();
	}

	render() {
		// console.log("STAAAATE", state);
		console.log("PROPS", this.props);

		return (
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Registration} />
				<Route path="/search" component={Search} />
				{/* // <Route component={} /> */}
			</Switch>
		);
	}
}

const mapState = (state) => ({
	location: state.location,
});

const mapDispatch = (dispatch) => ({
	getMarkers: (location) => dispatch(fetchMarkers(location)),
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
// Routes.propTypes = {
// 	loadInitialData: PropTypes.func.isRequired,
// 	// isLoggedIn: PropTypes.bool.isRequired
// };
