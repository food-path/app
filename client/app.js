import React from "react";
import { connect } from "react-redux";

const App = (props) => {
	return <div>{props.user.name}</div>;
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, null)(App);
