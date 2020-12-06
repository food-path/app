import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleBusinessDetails } from "../store/singleBusiness";
import { convertTime } from "../utils";

class SingleBusiness extends Component {
	constructor(props) {
		super();
	}
	componentDidMount() {
		this.props.getSingleBusiness(this.props.match.params.businessId);
	}

	render() {
		console.log("I am in singleBusiness Component");
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
				<div id="BusinessName">
					<h1>{singleBusiness.name}</h1>
				</div>
				{singleBusiness.categories ? (
					<div>
						<h4>
							Category:
							{singleBusiness.categories.map((obj) => obj.title).join("|")}
						</h4>
						<div id="hours">
							<ul>
								<h4>Hours:</h4>{" "}
								{hoursToDisplay.map((openHrs, id) => (
									<li key={id}>{openHrs}</li>
								))}
							</ul>
						</div>
						<h4>Street Address: {singleBusiness.location.address1}</h4>
						<h4>Phone: {singleBusiness.display_phone}</h4>

						<div
							class="Stars"
							style="--rating: {singleBusiness.rating};"
							aria-label="Rating of this product is 2.3 out of 5."
						>
							<h4>Rating: {singleBusiness.rating}</h4>

							<h4>Price: {singleBusiness.price}</h4>
							<img className="resize" src={singleBusiness.image_url} />
						</div>
					</div>
				) : (
					<a href=" https://codyogden.blog/content/images/2018/08/magic-burrito.gif"></a>
				)}
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
