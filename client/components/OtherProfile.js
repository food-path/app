//
//This component is to have another user/friend to share maps with
//
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { fetchOtherUser, addFriend } from "../store";

class OtherProfile extends React.Component {
	componentDidMount() {
		this.props.fetchOtherUser(this.props.match.params.id);
	}
	render() {
		const user = this.props.user;
		const otherUser = this.props.otherUser;
		const friends = otherUser.friends || [];
		const isFriend = friends.find((friend) => friend.id === user.id);
		return (
			<div id="container-profile">
				<img className="img-profile" src={otherUser.imageUrl} width="100px" />
				<h2 className="name">
					{" "}
					{otherUser.firstName} {otherUser.lastName}{" "}
				</h2>
				<div>
					<p className="member">
						Been fooding since:{" "}
						{new Date(otherUser.registrationDate).toLocaleDateString()}
					</p>
					<Button onClick={() => this.props.addFriend()} disabled={isFriend}>
						{isFriend ? "We're already friends!" : "Add Friend!"}
					</Button>
				</div>
				<div className="div-text">
					<p className="text-separation">My Friends</p>
				</div>
				<span className="friends">
					<ul>
						{friends.map((friend) => (
							<li key={friend.id}>
								<Link
									to={`/user/${friend.id}`}
									onClick={() => this.props.fetchOtherUser(friend.id)}
								>
									{friend.firstName} {friend.lastName}
								</Link>
							</li>
						))}
					</ul>
				</span>
			</div>
		);
	}
}

const mapState = (state) => ({
	otherUser: state.otherUser,
	user: state.user,
});

const mapDispatch = (dispatch) => ({
	fetchOtherUser: (id) => dispatch(fetchOtherUser(id)),
	addFriend: () => dispatch(addFriend()),
});

export default withRouter(connect(mapState, mapDispatch)(OtherProfile));
