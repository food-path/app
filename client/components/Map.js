import React from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
// AIzaSyAy7Z9PHW6OU2vwcjwZTHxgRh9uHm1F9CM

class Map extends React.Component {
	render() {
		return (
			<div style={{ height: "50vh", width: "50%" }}>
				<div id="map"></div>
				<GoogleMapReact
					bootstrapURLKeys={{ key: "AIzaSyAy7Z9PHW6OU2vwcjwZTHxgRh9uHm1F9CM" }}
					defaultCenter={{ lat: 40.74, lng: -73.98 }}
					defaultZoom={13}
				></GoogleMapReact>
			</div>
		);
	}
}

export default connect(null, null)(Map);
