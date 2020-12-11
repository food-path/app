import React, { Component } from "react";
import { Link } from "react-router-dom";
// import {SingleBusiness} from './SingleBusiness'
import Button from "react-bootstrap/Button";

class BusinessesList extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const markers = this.props.props.markers;
		return (
			<div className="businesses-list">
				<ul>
					{markers.map((marker) => {
						return (
							<li key={marker.id} id="single-entry">
								<ul>
									<Link to={`/singleBusiness/${marker.id}`}>
										<h5>{marker.name}</h5>
									</Link>
									<li>{`${marker.price} | ${marker.rating} stars`}</li>
									<Button
										variant="warning"
										onClick={() => this.props.props.removeMarker(marker.id)}
									>
										Delete from Map
									</Button>
								</ul>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default BusinessesList;
