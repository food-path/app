import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../store";
import { MyMaps } from ".";
import axios from "axios";

class Profile extends React.Component {
	constructor() {
		super();
		this.state = {
			email: "",
		};
	}
	render() {
		const user = this.props.user;
		const friends = user.friends || [];

		return (
			<div id="container-profile">
				<div id="profile-bg">
						<img className="img-profile" src={user.imageUrl} width="100px" />
						<h2 className="name">
							{" "}
							{user.firstName} {user.lastName}{" "}
						</h2>
						<div>
							<p className="member">
								Been fooding since{" "}
								{new Date(user.registrationDate).toLocaleDateString()}
							</p>
						</div>

						<p className="edit-profile">
							<Link to="/editProfile">Edit My Profile</Link>
						</p>
					<div className="div-text">
						<p className="text-separation">My Foodie Friends</p>
					</div>
					<form id="find-friend-form"
						onSubmit={async (event) => {
							event.preventDefault();
							const { data } = await axios.post("/api/users/findUserByEmail", {
								email: this.state.email,
							});
							if (!data) {
								alert("User Not Found!");
							} else {
								this.props.history.push(`/user/${data.id}`);
							}
						}}
					>
						<input id="find-friend-input"
							type="text"
							name="email"
							value={this.state.email}
							onChange={(event) => this.setState({ email: event.target.value })}
						/>
						<button id="find-friend-button" type="submit">Find User By Email</button>
					</form>
					<span className="friends">
						<ul className="foodie-friends">
							{friends.map((friend) => (
								<li key={friend.id} className="list-friends2">
									<Link to={`/user/${friend.id}`}>
										{friend.firstName} {friend.lastName}
									</Link>
								</li>
							))}
						</ul>
					</span>

					<div className="div-text">
						<p className="text-separation">My Foodie Maps</p>
					</div>
					<div className="saved-maps-2">
						<MyMaps user={user} />
					</div>
				</div>
			</div>
		);
	}
}

const mapState = (state) => ({
	user: state.user,
});

const mapDispatch = (dispatch) => ({
	logout: () => dispatch(logout()),
});

export default withRouter(connect(mapState, mapDispatch)(Profile));
