import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchMarkers, saveSearch } from "../store";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

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
	//TODO: import it into a utilities file, it's a more general purpose function. or move it into index file to reuse it
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
						this.props.saveSearch(this.state);

						//TODO: move this to thunk to make sure it's in the right order? to change recentering map after inputting search. could be an async issue
						this.props.history.push("/map");
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

						{/* TODO: hard code an array with strings and .map it and render the form check one by one and replace the name and label with the value in the map to make the code size more succinct
you can also abstract the form component to make a new component, kinda like a helper function
like a filter component to just make a checkbox component
*/}
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
				</Form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  fetchMarkers: (body) => dispatch(fetchMarkers(body)),
  saveSearch: (search) => dispatch(saveSearch(search)),
});

//withRouter gives us this.props.history
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
