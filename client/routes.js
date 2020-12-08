import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import {
	Login,
	MapComponent,
	Registration,
	Search,
	Profile,
	SingleBusiness,
	MyMaps,
	EditProfile,
	OtherProfile,
} from "./components";
import { me } from "./store";

class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const { isLoggedIn } = this.props;

		return (
			<>
				<Route exact path="/login" component={Login} />
				<Route exact path="/search" component={Search} />
				<Route exact path="/map" component={MapComponent} />
				<Route
					exact
					path="/singleBusiness/:businessId"
					component={SingleBusiness}
				/>
				<Route exact path="/user/:id" component={OtherProfile} />
				{isLoggedIn && (
					<>
						<Route exact path="/profile" component={Profile} />
						<Route exact path="/myMaps" component={MyMaps} />
						<Route exact path="/" component={Search} />
						<Route exact path="/editProfile" component={EditProfile} />
					</>
				)}
				{!isLoggedIn && (
					<>
						<Route exact path="/registration" component={Registration} />
						<Route exact path="/" component={Login} />
					</>
				)}
			</>
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
