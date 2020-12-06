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
			<div id="businesses-list">
				<ul>
					{markers.map((marker) => {
						return (
							<li key={marker.id}>
								<ul>
									<Link to={`/singleBusiness/${marker.id}`}>
										<h5>{marker.name}</h5>
									</Link>
									<Button
										variant="warning"
										onClick={() => this.props.props.removeMarker(marker.id)}
									>
										Delete from map
									</Button>
									<li>{marker.price}</li>
									<li>{marker.rating}</li>
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
