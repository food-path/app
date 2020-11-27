import React from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import { fetchMarkers } from "../store";

const Marker = ({ text, imageUrl }) => (
	<div
		className="marker"
		style={{ textAlign: "center", display: "block", width: "60px" }}
	>
		<p>{text}</p>
		<img src={imageUrl} width="60px" />
		<img src="/img/marker.png" height="30px" />
	</div>
);

class Map extends React.Component {
	constructor() {
		super();
		this.state = {
			location: "New York",
			center: { lat: 40.74, lng: -73.98 },
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.setMap = this.setMap.bind(this);
	}
	setMap({ map, maps }) {
		// console.log(maps.DirectionsRenderer);
		// const directionDisplay = new maps.DirectionsRenderer();
		// directionDisplay.setOptions({directions: });
		// directionDisplay.setMap(map);
		this.setState({ map, maps });
	}

	onChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	async onSubmit(event) {
		event.preventDefault();
		await this.props.fetchMarkers(this.state.location);

		if (this.props.markers.length > 0) {
			const firstMarker = this.props.markers[0];
			this.state.map.setCenter({
				lat: firstMarker.coordinates.latitude,
				lng: firstMarker.coordinates.longitude,
			});
		}
	}

	render() {
		const markers = this.props.markers || [];

		return (
			<div style={{ height: "50vh", width: "50%" }}>
				<div id="map"></div>
				<GoogleMapReact
					bootstrapURLKeys={{ key: "AIzaSyAy7Z9PHW6OU2vwcjwZTHxgRh9uHm1F9CM" }}
					defaultCenter={{ lat: 40.74, lng: -73.98 }}
					defaultZoom={13}
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={this.setMap}
				>
					{markers.map((marker) => (
						<Marker
							key={marker.id}
							lat={marker.coordinates.latitude}
							lng={marker.coordinates.longitude}
							text={marker.name}
							imageUrl={marker.image_url}
						/>
					))}
				</GoogleMapReact>
				<form onSubmit={this.onSubmit} style={{ padding: "20px" }}>
					<input
						type="text"
						name="location"
						onChange={this.onChange}
						value={this.state.location}
					/>
					<button type="submit">Search</button>
				</form>
			</div>
		);
	}
}

const mapState = (state) => ({
	markers: state.markers,
});

const mapDispatch = (dispatch) => ({
	fetchMarkers: (location) => dispatch(fetchMarkers(location)),
});

export default connect(mapState, mapDispatch)(Map);
