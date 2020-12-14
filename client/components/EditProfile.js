import React from "react";
import { connect } from "react-redux";
import { editUser } from "../store";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

class EditProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			imageUrl: props.user.imageUrl,
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	render() {
		let user = this.props.user;
		return (
			<div className="edit-profile-container">
				<Form id="edit-profile-form"
					onSubmit={(event) => {
						event.preventDefault();
						this.props.editUser(user.id, this.state);
						this.props.history.push("/profile");
					}}
				>
					<Form.Label>Edit First Name</Form.Label>
					<Form.Control
						type="text"
						name="firstName"
						value={this.state.firstName}
						placeholder={user.firstName}
						onChange={this.onChange}
					/>
					<Form.Label>Edit Last Name</Form.Label>
					<Form.Control
						type="text"
						name="lastName"
						value={this.state.lastName}
						placeholder={user.lastName}
						onChange={this.onChange}
					/>
					<Form.Label>Edit Email</Form.Label>
					<Form.Control
						type="email"
						name="email"
						value={this.state.email}
						placeholder={user.email}
						onChange={this.onChange}
					/>

					{!user.googleId && (
						<>
							<Form.Label>Edit Password</Form.Label>
							<Form.Control
								type="password"
								name="password"
								value={this.state.password}
								placeholder="Enter password here"
								onChange={this.onChange}
							/>
						</>
					)}
					<Form.Label>Edit Your User Profile Picture</Form.Label>
					<Form.Control
						type="text"
						name="imageUrl"
						value={this.state.imageUrl}
						onChange={this.onChange}
					/>
					<Button id="edit-profile-save" type="submit">Save Changes</Button>
				</Form>
			</div>
		);
	}
}
const mapState = (state) => ({
	user: state.user,
});

const mapDispatch = (dispatch) => ({
	editUser: (id, body) => dispatch(editUser(id, body)),
});

export default withRouter(connect(mapState, mapDispatch)(EditProfile));
