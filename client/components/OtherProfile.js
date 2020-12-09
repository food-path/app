//
//This component is to have another user/friend to share maps with
//
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { fetchOtherUser, addFriend, gotMarkers, addMarkers } from "../store";

class OtherProfile extends React.Component {
	componentDidMount() {
		this.props.fetchOtherUser(this.props.match.params.id);
	}
	render() {
		const user = this.props.user;
		const otherUser = this.props.otherUser;
		const friends = otherUser.friends || [];
		const isFriend = friends.find((friend) => friend.id === user.id);
		const maps = otherUser.foodiemaps || [];

		return (
			<div id="container-friend">
				<img className="img-profile-friend" src={otherUser.imageUrl} width="30px" />
				<h2 className="name-friend">
					{" "}
					{otherUser.firstName} {otherUser.lastName}{" "}
				</h2>
				<div>
					<p className="member-friend">
						Been fooding since:{" "}
						{new Date(otherUser.registrationDate).toLocaleDateString()}
					</p>
					<Button className="btn-friend-already btn-sm" onClick={() => this.props.addFriend()} disabled={isFriend}>
						{isFriend ? "We're already friends!" : "Add Friend!"}
					</Button>
				</div>
				<div className="div-text">
					<p className="text-separation">{otherUser.firstName}'s Friends</p>
				</div>
				<span className="friends">
					<ul>
						{friends.map((friend) => (
							<li key={friend.id}>
								<Link className="friends-name-link"
									to={`/user/${friend.id}`}
									onClick={() => this.props.fetchOtherUser(friend.id)}
								>
									{friend.firstName} {friend.lastName}
								</Link>
							</li>
						))}
					</ul>
				</span>

				<div className="div-text">
					<p className="text-separation">{otherUser.firstName}'s Maps</p>
				</div>
				<ul>
					{maps.map((map) => (
						<li key={map.id}>
							<Link
								to="/map"
								onClick={() => {
									this.props.gotMarkers([]);
									this.props.addMarkers(map.businesses);
								}}
							>
								<p>{map.name}</p>
							</Link>

							<p>{map.businesses.length}</p>
						</li>
					))}
				</ul>
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
	gotMarkers: (markers) => dispatch(gotMarkers(markers)),
	addMarkers: (businesses) => dispatch(addMarkers(businesses)),
});

export default withRouter(connect(mapState, mapDispatch)(OtherProfile));
