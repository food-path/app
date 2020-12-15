import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchMarkers, saveSearch } from "../store";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import { priceToText } from "../utils";
import Modal from "react-bootstrap/Modal";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { ToggleButton } from "react-bootstrap";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      term: "",
      price: "$",
      minPrice: 0,
      maxPrice: 100,
      categories: [],
      showNoResultsFound: false,
      className:'toggle-btn',
      selectedBtn: [], 
      btn1:'toggle-btn-clicked', 
      btn2:'toggle-btn',
      btn3:'toggle-btn',
      btn4:'toggle-btn',
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(price) {

    console.log('price:', price)
    if (price.includes('$')){
      this.setState({
        price, 
        btn1:'toggle-btn-clicked'
      })
    }
    if (price.includes('$$')){
      this.setState({
        price, 
        btn2:'toggle-btn-clicked'
      })
    }
    if (price.includes('$$$')){
      this.setState({
        price, 
        btn3:'toggle-btn-clicked'
      })
    }
    if (price.includes('$$$$')){
      this.setState({
        price, 
        btn4:'toggle-btn-clicked'
      })
    }
    //reset state on buttons
    if (!price.includes('$')){
      this.setState({
        price, 
        btn1:'toggle-btn'
      })
    }
    if (!price.includes('$$')){
      this.setState({
        price, 
        btn2:'toggle-btn'
      })
    }
    if (!price.includes('$$$')){
      this.setState({
        price, 
        btn3:'toggle-btn'
      })
    }
    if (!price.includes('$$$$')){
      this.setState({
        price, 
        btn4:'toggle-btn'
      })
    }



    // this.setState({
    //       price: price,
    //       selectedBtn: [...selectedBtn,price] //['$','$$']
    //     });


    // if (this.state.className === 'toggle-btn'){
    //   this.setState({
    //     price: price,
    //     className: 'toggle-btn-1'
    //   });
    // }else{
    //   this.setState({
    //     price: price,
    //     className: 'toggle-btn'
    //   });
    // }
    
    // console.log("inside handleChange")
  }

  render() {
    let minPrice = priceToText(this.state.minPrice);
    let maxPrice = priceToText(this.state.maxPrice);
    const user = this.props.user;
    console.log("this.state.price: ", this.state.price)
    console.log("this.state.btn1: ", this.state.btn1)
    console.log("this.state.btn2: ", this.state.btn2)
    
    return (
      <div className="container-search">
        <div id="search-bg">
          <h2 className="welcome-name"> Welcome, {user.firstName}!</h2>

          <div className="logo-behind">
            <img src="/img/logo2.png" width="450" className="logo-login" />
          </div>

          <Modal
            show={this.state.showNoResultsFound}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                No results found
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Try Again!</h4>
              {!this.state.location ? 
               (<p>
               Please enter a city or zip code
             </p>) : (
                 <p>
                 {/* We couldn't find {this.state.term} in {this.state.location} */}
                 Oh no! We couldn't find what you're looking for
                 <br />
                 Let's try something else!
               </p>
             )
            } 
             

            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => this.setState({ showNoResultsFound: false })}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Form
            className="search-form"
            onSubmit={async (event) => {
              event.preventDefault();
              await this.props.fetchMarkers(this.state);
              if (this.props.markers.length === 0) {
                this.setState({ showNoResultsFound: true });
              } else {
                await this.props.saveSearch(this.state);
                this.props.history.push("/map");
              }
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

                <div className="input-fields">
                  <Form.Label></Form.Label>
                  <Form.Control
                    id="food-label"
                    type="term"
                    name="term"
                    value={this.state.term}
                    placeholder="Enter key words"
                    onChange={this.onChange}
                  />

                  {/* <div className="price-fields">
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
                  </div> */}
                <div id="div-toggle-btn">
                  <ToggleButtonGroup
                          id="toggle-btn-group"
                          type="checkbox"
                          name="options"
                          variant="secondary"
                          value={this.state.price}
                          onChange={this.handleChange}
                            >
                                <ToggleButton className={this.state.btn1} value={'$'}>$</ToggleButton>
                                {" "}
                                <ToggleButton className={this.state.btn2} value={"$$"}>$$</ToggleButton>
                                {" "}
                                <ToggleButton className={this.state.btn3}  value={"$$$"}>$$$</ToggleButton>
                                {" "}
                                <ToggleButton className={this.state.btn4}  value={"$$$$"}>$$$$</ToggleButton>
                  </ToggleButtonGroup>
                </div>
									<div className="diet-fields">
										<div key="inline-checkbox" className="mb-3">
											{[
												"Vegetarian",
												"Vegan",
												"Halal",
												"Kosher",
												"Gluten-Free",
											].map((cat) => (
												<Form.Check
													inline
													name={cat.toLowerCase().replace("-", "_")}
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
								</div>
							</div>
						</Form.Group>
					</Form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
  user: state.user,
  markers: state.markers,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMarkers: (body) => dispatch(fetchMarkers(body)),
  saveSearch: (search) => dispatch(saveSearch(search)),
});

//withRouter gives us this.props.history
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
