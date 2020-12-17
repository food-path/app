import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleBusinessDetails } from "../store/singleBusiness";
import { convertTime } from "../utils";
import { Link } from "react-router-dom"
import { format } from "morgan";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import Carousel from "react-bootstrap/Carousel"

class SingleBusiness extends Component {
	constructor(props) {
    super();
  }
	componentDidMount() {
		this.props.getSingleBusiness(this.props.match.params.businessId);
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
				{singleBusiness.categories ? (
          <div>
              <div id="bg-image-business">
               <Carousel id='img-carousel'
                //  style={{width: '40rem', padding: '1rem', alignSelf: 'center'}}
               >
                 {singleBusiness.photos.map((url, i) => (
                   <Carousel.Item key={i} interval={2000}>
                     <img  id="bannerimage" className="resize" src={url} alt={singleBusiness.name} />
                   </Carousel.Item>
                 ))}
               </Carousel>
             </div>
               <div id="BusinessName">
                     <h1 id="text-Name">{singleBusiness.name}</h1>
               </div>

					<div id='wrapper'>
						<div id='wrapper1a'>
							<h4 id="description-business">
								{singleBusiness.categories.map((obj) => obj.title).join(" | ")}
							</h4>
							<h4 id="business-price-range">{singleBusiness.price} {" | "} {singleBusiness.rating} {"stars"} </h4>
							<h6>
                {" "}
                {singleBusiness.display_phone}
                {" | "} {singleBusiness.location.address1}
              </h6>
						</div>
						<div id='horizontal'></div>
						<div id="wrapper1b">
							<ul id="list-hours">
								<h4 id="list-hours-title">Hours of Operation</h4>{" "}
								{hoursToDisplay.map((openHrs, id) => (
									<li id="list-days" key={id}>{openHrs}</li>
								))}
							</ul>
              <div id="horizontal"></div>
							<div id="separator"></div>
							<h4 id="review-title">Reviews</h4>
							<ul className='link'>
								{singleBusiness.reviews.map((review) => (
									<li key={review.id}>
										<hr></hr>
										<p className="stars-review">{review.rating} stars</p>
										<p className="text-reviews" style={{ fontStyle: "italic" }}>{review.text}</p>
									</li>
								))}
							</ul>
							<Form id='reviews' action={singleBusiness.reviews[1].url} target={'_blank'} rel={'noreferrer'}>
    							<input type="submit" value="See all reviews on Yelp" variant="secondary" id="reviewButton"/>
							</Form>
							<br></br>
						</div>
          </div>
          </div>
				) : (
					<img id='loader' src="https://cutewallpaper.org/21/loading-gif-transparent-background/CBP-Portal.gif"></img>
				)}
				<div id='backToMap' className='link'>
        <img
            src="/icons/arrow-left-short.svg"
            width="30"
            className="back-icon"
          />
          {<Link to='/map'>Back to My Foodie Map </Link>}</div>
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
