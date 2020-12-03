import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchMarkers, saveSearch } from "../store";
import {Link} from 'react-router-dom'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import { priceToText } from "../utils";


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

	render() {
		let minPrice = priceToText(this.state.minPrice);
		let maxPrice = priceToText(this.state.maxPrice);
		return (
			<div>
				<Form
					onSubmit={async (event) => {
						event.preventDefault();
						await this.props.fetchMarkers(this.state);
						await this.props.saveSearch(this.state);
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
						<div key="inline-checkbox" className="mb-3">
							{["Vegetarian", "Vegan", "Halal", "Kosher"].map((cat) => (
								<Form.Check
									inline
									name={cat.toLowerCase()}
									label={cat}
									type="checkbox"
									onChange={this.onChangeCheckbox}
									key={cat}
								/>
							))}
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
