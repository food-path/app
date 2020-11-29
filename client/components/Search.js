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
			term: "",
			minPrice: 0,
			maxPrice: 100,
			categories: [],
		};
		this.onChange = this.onChange.bind(this);
		this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	onChangeCheckbox(event) {
		this.setState({
			categories: event.target.checked
				? [...this.state.categories, event.target.name]
				: this.state.categories.filter((cat) => cat !== event.target.name),
		});
	}

	priceToText(price) {
		if (+price <= 25) return "$";
		else if (+price <= 50) return "$$";
		else if (+price <= 75) return "$$$";
		else return "$$$$";
	}

	render() {
		let minPrice = this.priceToText(this.state.minPrice);
		let maxPrice = this.priceToText(this.state.maxPrice);
		return (
			<div>
				<Form
					onSubmit={(event) => {
						event.preventDefault();
						this.props.fetchMarkers(this.state);
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

						<Form.Label>Search Term</Form.Label>
						<Form.Control
							type="text"
							name="term"
							value={this.state.term}
							placeholder="Enter what you're looking for"
							onChange={this.onChange}
						/>

						<Form.Label>Minimum Price: {minPrice}</Form.Label>
						<Form.Control
							type="range"
							name="minPrice"
							value={this.state.minPrice}
							onChange={this.onChange}
						/>

						<Form.Label>Maximum Price: {maxPrice}</Form.Label>
						<Form.Control
							type="range"
							name="maxPrice"
							value={this.state.maxPrice}
							onChange={this.onChange}
						/>

						<div key="inline-checkbox" className="mb-3">
							<Form.Check
								inline
								name="vegetarian"
								label="Vegetarian"
								type="checkbox"
								id="inline-checkbox"
								onChange={this.onChangeCheckbox}
							/>

							<Form.Check
								inline
								name="vegan"
								label="Vegan"
								type="checkbox"
								id="inline-checkbox"
								onChange={this.onChangeCheckbox}
							/>

							<Form.Check
								inline
								name="halal"
								label="Halal"
								type="checkbox"
								id="inline-checkbox"
								onChange={this.onChangeCheckbox}
							/>

							<Form.Check
								inline
								name="kosher"
								label="Kosher"
								type="checkbox"
								id="inline-checkbox"
								onChange={this.onChangeCheckbox}
							/>
						</div>

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
	fetchMarkers: (body) => dispatch(fetchMarkers(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
