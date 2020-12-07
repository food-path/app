//
//This component is to have another user/friend to share maps with
//
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { fetchOtherUser } from "../store";

class OtherProfile extends React.Component {
	componentDidMount() {
		this.props.fetchOtherUser(this.props.match.params.id);
	}
	render() {
		const user = this.props.user;
		return (
			<div id="container-profile">
				<img className="img-profile" src={user.imageUrl} width="100px" />
				<h2 className="name">
					{" "}
					{user.firstName} {user.lastName}{" "}
				</h2>
				<div>
					<p className="member">
						Been fooding since:{" "}
						{new Date(user.registrationDate).toLocaleDateString()}
					</p>
				</div>
				{/* <div className="div-text">
					<p className="text-separation">
						My Foodie Maps
					</p>
				</div>
				<p className="saved-maps">
					<Link to="/myMaps">Go To My Saved Maps</Link>
				</p> */}
			</div>
		);
	}
}

const mapState = (state) => ({
	user: state.otherUser,
});

const mapDispatch = (dispatch) => ({
	fetchOtherUser: (id) => dispatch(fetchOtherUser(id)),
});

export default withRouter(connect(mapState, mapDispatch)(OtherProfile));
