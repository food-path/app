import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchMarkers, saveSearch } from "../store";
import { Link } from "react-router-dom";
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
    const user = this.props.user;

    return (
      <div className="container-search">
        <h2 className="welcome-name">
          {" "}
          Welcome,
          {user.firstName}!
        </h2>

        <Form
          className="search-form"
          onSubmit={async (event) => {
            event.preventDefault();
            await this.props.fetchMarkers(this.state);
            await this.props.saveSearch(this.state);
            this.props.history.push("/map");
          }}
        >
          <Form.Group>
            <div className="input-fields">
              <Form.Label></Form.Label>
              <Form.Control
                id="city-label"
                type="city"
                name="location"
                value={this.state.location}
                placeholder="Enter city or zip code"
                onChange={this.onChange}
              />

              <Form.Label></Form.Label>
              <Form.Control
                id="food-label"
                type="text"
                name="term"
                value={this.state.term}
                placeholder="Enter key words"
                onChange={this.onChange}
              />
            </div>

            <div className="price-fields">
              <Form.Label>Minimum Price: {minPrice}</Form.Label>
              <Form.Control
                id="slider-min-price"
                type="range"
                name="minPrice"
                value={this.state.minPrice}
                onChange={this.onChange}
              />

              <Form.Label>Maximum Price: {maxPrice}</Form.Label>
              <Form.Control
                id="slider-max-price"
                type="range"
                name="maxPrice"
                value={this.state.maxPrice}
                onChange={this.onChange}
              />
            </div>

            <div className="diet-fields">
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
            </div>

            <Button id="btn-search" variant="primary" type="submit">
              GET MY FOODIEMAP
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = (dispatch) => ({
  fetchMarkers: (body) => dispatch(fetchMarkers(body)),
  saveSearch: (search) => dispatch(saveSearch(search)),
});

//withRouter gives us this.props.history
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
