import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchMarkers } from "../store";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			location: "",
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}
	render() {
		return (
			<div>
				<Form
					onSubmit={(event) => {
						event.preventDefault();
						this.props.fetchMarkers(this.state.location);
					}}
				>
					<Form.Group controlId="searchInput">
						<Form.Label>Enter a city</Form.Label>
						<Form.Control
							type="city"
							name="location"
							value={this.state.location}
							placeholder="Enter city or zip code"
							onChange={this.onChange}
						/>

						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form.Group>

					{/* <Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					<Form.Group controlId="formBasicCheckbox">
						<Form.Check type="checkbox" label="Check me out" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button> */}
				</Form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
	fetchMarkers: (location) => dispatch(fetchMarkers(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
