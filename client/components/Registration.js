import React from "react";
import { connect } from "react-redux";
import { register } from "../store";
import Button from "react-bootstrap/Button";

class Registration extends React.Component {
	constructor() {
		super();
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	onSubmit(event) {
		event.preventDefault();
		this.props.auth(this.state);
		this.setState({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		});
	}

	render() {
		return (
			<>
				<form onSubmit={this.onSubmit}>
					<input
						name="firstName"
						type="text"
						placeholder="First name"
						value={this.state.firstName}
						onChange={this.onChange}
					/>
					<input
						name="lastName"
						type="text"
						placeholder="Last name"
						value={this.state.lastName}
						onChange={this.onChange}
					/>
					<input
						name="email"
						type="email"
						placeholder="Email"
						value={this.state.email}
						onChange={this.onChange}
					/>
					<input
						name="password"
						type="password"
						placeholder="Password"
						value={this.state.password}
						onChange={this.onChange}
					/>
					<button type="submit">Sign Up</button>
				</form>

				<form method="get" action="/auth/google">
					<Button type="submit">Login with Google</Button>
				</form>
			</>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	auth: (body) => dispatch(register(body)),
});

export default connect(null, mapDispatchToProps)(Registration);
