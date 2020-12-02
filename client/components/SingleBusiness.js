import React, { Component } from "react";
import { connect } from "react-redux";
import {fetchSingleBusiness,fetchSingleBusinessDetails} from "../store/singleBusiness";

class SingleBusiness extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    this.props.getSingleBusiness(this.props.match.params.businessId);
  }

  convertTime(time) {
    let numValue = Number(time) / 100;
    let AmOrPm = numValue >= 12 ? "pm" : "am";
    let finalTime =AmOrPm === "pm" ? String(numValue - 12) + AmOrPm: String(numValue) + AmOrPm;
    return finalTime;
  }

  render() {
    const { singleBusiness } = this.props;
        console.log("singleBusiness:", singleBusiness);

    let hoursToDisplay = [];
    if (singleBusiness.categories) {
      let hours = {
        days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        dayId:singleBusiness.hours[0].open.map((hrsObj) => hrsObj.day),
        start: singleBusiness.hours[0].open.map((hrsObj) => this.convertTime(hrsObj.start)),
        end: singleBusiness.hours[0].open.map((hrsObj) => this.convertTime(hrsObj.end)),
      };
      console.log('hours: ', hours)
      for (let i = 0; i < hours.days.length; i++) {
        if (!hours.dayId.includes(i)) {
          //!hours.start[i]
          hoursToDisplay.push(`${hours.days[i]}: Closed`);
        } else {
          hoursToDisplay.push(`${hours.days[i]}: ${hours.start[i]} - ${hours.end[i]}`);
        }
      }
    }

    return (
      <div>
        <h1>{singleBusiness.name}</h1>
        {singleBusiness.categories ? (
          <div>
            <h4>
              Category:
              {singleBusiness.categories.map((obj) => obj.title).join("|")}
            </h4>

            <ul>
              <h4>Hours:</h4>{" "}
              {hoursToDisplay.map((openHrs, id) => (
                <li key={id}>{openHrs}</li>
              ))}
            </ul>
            <h4>Street Address: {singleBusiness.location.address1}</h4>
            <h4>Phone: {singleBusiness.display_phone}</h4>
            <h4>Rating: {singleBusiness.rating}</h4>
            <h4>Price: {singleBusiness.price}</h4>
            <img className="resize" src={singleBusiness.image_url} />
          </div>
        ) : (
          <h1>Error</h1>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleBusiness: state.singleBusiness, //state.singleBusiness value comes from store
  };
};
const mapDispatch = (dispatch) => {
  return {
    getSingleBusiness: (id) => dispatch(fetchSingleBusinessDetails(id)),
  };
};
export default connect(mapState, mapDispatch)(SingleBusiness);
