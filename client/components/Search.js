import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchMarkers } from "../store";
import { Form } from "react-bootstrap";

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			location: "",
		};
	}
	return() {
		return (
			<div>
				<Form>
					<Form.Group controlId="searchInput">
						<Form.Label>Enter a city</Form.Label>
						<Form.Control type="city" placeholder="Enter city or zip code" />
						{/* <Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text> */}
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

const mapStateToProps = (state) => {
	console.log("THIS IS THE STAAAATE:", state);

	return {
		location: state.location,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateProductData: (product) => dispatch(fetchUpdatedProduct(product)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
