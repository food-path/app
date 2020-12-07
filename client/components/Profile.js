import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { logout } from "../store";

class Profile extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <div id="container-profile">
        <img className="img-profile" src={user.imageUrl} width="100px" />
        <h2 className="name">
          {" "}
          {user.firstName} {user.lastName}{" "}
        </h2>
        <div>
          <p className="member">
            Been fooding since:{" "}
            {new Date(user.registrationDate).toLocaleDateString()}
          </p>
        </div>

        <p className="edit-profile">
          <Link to="/editProfile" >Edit My Profile</Link>
        </p>

        <div className="div-text">
          <p className="text-separation">My Foodie Friends 
          {/* <img src="./icons/geo-alt.svg" width="20" className="foodie-icon" /> */}
          </p>
        </div>

        <div className="div-text">
          <p className="text-separation">My Foodie Maps 
          {/* <img src="./icons/person-bounding-box.svg" width="20" className="account-icon" /> */}
          </p>
        </div>

        <p className="saved-maps">
          <Link to="/myMaps">List of Saved Maps</Link>
        </p>

      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
});

const mapDispatch = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default withRouter(connect(mapState, mapDispatch)(Profile));
