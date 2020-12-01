import React from "react";
import { connect } from "react-redux";
import { auth } from "../store";
import Button from "react-bootstrap/Button";

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			name: "",
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
			name: "",
			password: "",
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<input
						name="name"
						type="text"
						placeholder="User name"
						value={this.state.name}
						onChange={this.onChange}
					/>
					<input
						name="password"
						type="password"
						placeholder="Password"
						value={this.state.password}
						onChange={this.onChange}
					/>
					<button type="submit">Submit</button>
				</form>
				<form method="get" action="/auth/google">
					<Button type="submit">Login with Google</Button>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	auth: (body) => dispatch(auth(body)),
});

export default connect(null, mapDispatchToProps)(Login);
