import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavItem } from "react-bootstrap";

/**
 * COMPONENT
 */
//TODO: What is UserHome for? We're not currently using it
export const UserHome = (props) => {
	const { name } = props;
	return (
		<>
			<NavItem className="text-white d-flex align-items-center">
				Welcome, foodie friend! {name}
			</NavItem>
		</>
	);
};

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		name: state.user.firstName,
	};
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
	name: PropTypes.string,
};
