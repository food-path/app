import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import {
	Login,
	MapComponent,
	Registration,
	Search,
	UserHome,
	Profile,
} from "./components";
import { me } from "./store";

class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const { isLoggedIn } = this.props;

		return (
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Registration} />
				<Route exact path="/search" component={Search} />
				<Route exact path="/map" component={MapComponent} />
				<Route exact path="/profile" component={Profile} />
				<Route exact path="/singleBusiness/:businessId" component={SingleBusiness} />
				{isLoggedIn && (
					<Switch>
						{/* Routes placed here are only available after logging in */}
						<Route path="/search" component={UserHome} />
						<Route path="/search" component={Search} />
					</Switch>
				)}
				{/* Displays our Login component as a fallback */}
				<Route component={Login} />
			</Switch>
		);
	}
}


const mapState = (state) => ({
	// Being 'logged in' for our purposes will be defined as having a state.user that has a truthy id.
	// Otherwise, state.user will be an empty object, and state.user.id will be falsy
	isLoggedIn: !!state.user.id,
});

const mapDispatch = (dispatch) => ({
	loadInitialData() {
		dispatch(me());
	},
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
	loadInitialData: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
};
