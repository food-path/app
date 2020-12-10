import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleBusinessDetails } from "../store/singleBusiness";
import { convertTime } from "../utils";
import { Link } from "react-router-dom";

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
        <div id="bg-image-business">
          <img
            id="bannerimage"
            className="resize"
            src={singleBusiness.image_url}
          />
        </div>

        <div id="BusinessName">
          <h1 id="text-Name">{singleBusiness.name}</h1>
        </div>
        {singleBusiness.categories ? (
          <div id="wrapper">
            <div id="wrapper1a">
              <h4 id="description-business">
                {singleBusiness.categories.map((obj) => obj.title).join("|")}
              </h4>
              <h4 id="business-price-range">
                {singleBusiness.price} {"|"} {singleBusiness.rating} {"stars"}{" "}
              </h4>
              <h6>
                {" "}
                {singleBusiness.display_phone} {"|"}{" "}
                {singleBusiness.location.address1}
              </h6>
            </div>
            <div id="horizontal"></div>
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
              <ul className="link">
                {singleBusiness.reviews.map((review) => (
                  <li key={review.id}>
                    <hr></hr>
                    <p className="stars-review">{review.rating} stars</p>
                    <a href={review.url}>
                      <p style={{ fontStyle: "italic" }}>{review.text}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <img src="https://codyogden.blog/content/images/2018/08/magic-burrito.gif"></img>
        )}
        <div id="backToMap" className="link">
          <img
            src="/icons/arrow-left-short.svg"
            width="30"
            className="back-icon"
          />
          {<Link to="/map">Back to My Foodie Map </Link>}
        </div>
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
