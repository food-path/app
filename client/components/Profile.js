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

        <p className="text-separation">My Foodie Maps</p>

        <p className="saved-maps">
          <Link to="/myMaps">Go To My Saved Maps</Link>
        </p>
        <div>
          <p className="text-separation">My Account</p>
        </div>

        <p>
          <Link to="/editProfile">Edit My Profile</Link>
        </p>

        <Button
		  variant="outline-secondary btn-sm"
		  className="btn-logout"
          onClick={() => {
            this.props.logout();
            this.props.history.push("/");
          }}
        >
          Logout
        </Button>
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
