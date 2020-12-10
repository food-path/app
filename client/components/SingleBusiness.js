import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleBusinessDetails } from "../store/singleBusiness";
import { convertTime } from "../utils";
import { Link } from "react-router-dom"
import Popup from "./Popup"
import { format } from "morgan";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"

class SingleBusiness extends Component {
	constructor(props) {
		super();
		this.state = {
			showPopup: false
		}
		this.togglePopup = this.togglePopup.bind(this)
	}
	componentDidMount() {
		this.props.getSingleBusiness(this.props.match.params.businessId);
	}

	togglePopup(url) {  
		this.setState({  
			 showPopup: !this.state.showPopup,  
			 selectedUrl: url
		});  
	} 

	render() {
		const { singleBusiness } = this.props;
		console.log("singleBusiness:", singleBusiness);

		let hoursToDisplay = [];
		if (singleBusiness.categories) {
			let hours = {
				days: [
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday",
					"Sunday",
				],
				dayId: singleBusiness.hours[0].open.map((hrsObj) => hrsObj.day),
				start: singleBusiness.hours[0].open.map((hrsObj) =>
					convertTime(hrsObj.start)
				),
				end: singleBusiness.hours[0].open.map((hrsObj) =>
					convertTime(hrsObj.end)
				),
			};

			for (let i = 0; i < hours.days.length; i++) {
				let j = 0;
				if (!hours.dayId.includes(i)) {
					hoursToDisplay.push(`${hours.days[i]}: Closed`);
					j--;
				} else {
					hoursToDisplay.push(
						`${hours.days[i]}: ${hours.start[j]} - ${hours.end[j]}`
					);
					j++;
				}
			}
		}

		return (
			<div id="singleBusiness">
				<img id="bannerimage" className="resize" src={singleBusiness.image_url} />
				<div id="BusinessName">
					<h1>{singleBusiness.name}</h1>
				</div>
				{singleBusiness.categories ? (
					<div id='wrapper'>
						<div id='wrapper1a'>
							<h4>
								{singleBusiness.categories.map((obj) => obj.title).join("|")}
							</h4>
							<h4>{singleBusiness.price} {"|"} {singleBusiness.rating} {"stars"} </h4>
							<h6> {singleBusiness.display_phone} {"|"} {singleBusiness.location.address1}</h6>
						</div>
						<div id='horizontal'></div>
						<div id="wrapper1b">
							<ul>
								<h4>Hours of Operation</h4>{" "}
								{hoursToDisplay.map((openHrs, id) => (
									<li key={id}>{openHrs}</li>
								))}
							</ul>
							<div id='separator'></div>
							<h4>Reviews</h4>

							<Form action={singleBusiness.reviews[1].url} target={'_blank'} rel={'noreferrer'}>
    							<input type="submit" value="See all reviews on Yelp!" />
							</Form>

							<ul className='link'>
								{singleBusiness.reviews.map((review) => (
									<li key={review.id}>
										<hr></hr>
										<p>{review.rating} stars</p>

										<p style={{ fontStyle: "italic" }}>{review.text}</p>
									</li>
								))}
							</ul>
					{this.state.showPopup ?  
					<Popup  
          						text='Review will open in separate tab...routing to Yelp'
								  closePopup={this.togglePopup}  
								  url = {this.state.selectedUrl}
								
					/>  
						: null  
					} 
						</div>
					</div> 
				) : (
					<img src="https://codyogden.blog/content/images/2018/08/magic-burrito.gif"></img>
				)}
				<div id='backToMap' className='link'>{<Link to='/map'>Back to My Foodie Map </Link>}</div>
				
			</div>
			
		);
	}
}

const mapState = (state) => {
	return {
		singleBusiness: state.singleBusiness,
	};
};
const mapDispatch = (dispatch) => {
	return {
		getSingleBusiness: (id) => dispatch(fetchSingleBusinessDetails(id)),
	};
};
export default connect(mapState, mapDispatch)(SingleBusiness);
