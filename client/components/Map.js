import React from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import { createMap, fetchMaps, addMarkers } from "../store";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
	constructor(props) {
		super(props);
		this.state = {
			center: { lat: 40.74, lng: -73.98 },
			name: "",
			map: null,
			maps: null,
			mapToAddId: "default",
		};
		this.onChange = this.onChange.bind(this);
		this.setMap = this.setMap.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount() {
		if (this.props.markers.length > 0) {
			const firstMarker = this.props.markers[0];
			this.setState({
				center: {
					lat: firstMarker.coordinates.latitude,
					lng: firstMarker.coordinates.longitude,
				},
			});
			// this.state.map.setCenter({
			// 	lat: firstMarker.coordinates.latitude,
			// 	lng: firstMarker.coordinates.longitude,
			// });
		}
		this.props.fetchMaps();
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	onSubmit(event) {
		event.preventDefault();
		this.props.createMap(this.props.search, this.props.markers, {
			name: this.state.name,
		});
	}

	setMap({ map, maps }) {
		// console.log(maps.DirectionsRenderer);
		// const directionDisplay = new maps.DirectionsRenderer();
		// directionDisplay.setOptions({directions: });
		// directionDisplay.setMap(map);
		this.setState({ map, maps });
	}

	render() {
		const markers = this.props.markers || [];
		const maps = this.props.maps || [];
		return (
			<div>
				<div id="map-container">
					<GoogleMapReact
						id="map"
						bootstrapURLKeys={{
							key: "AIzaSyAy7Z9PHW6OU2vwcjwZTHxgRh9uHm1F9CM",
						}}
						defaultCenter={{ lat: 40.74, lng: -73.98 }}
						defaultZoom={13}
						yesIWantToUseGoogleMapApiInternals
						onGoogleApiLoaded={this.setMap}
						center={this.state.center}
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
				</div>
				<Form
					onSubmit={(event) => {
						event.preventDefault();
						const mapToAdd = this.props.maps.find(
							(m) => m.id === +this.state.mapToAddId
						);
						this.props.addMarkers(mapToAdd.businesses);
					}}
				>
					<Form.Label>Map To Add</Form.Label>
					<Form.Control
						as="select"
						name="mapToAddId"
						onChange={this.onChange}
						value={this.state.mapToAddId}
					>
						<option value="default">Choose a map...</option>
						{maps.map((m) => (
							<option value={m.id} key={m.id}>
								{m.name}
							</option>
						))}
					</Form.Control>
					<Button variant="primary" type="submit">
						Add Businesses To Current Map
					</Button>
				</Form>
				<Form onSubmit={this.onSubmit}>
					<Form.Label>Map Name</Form.Label>
					<Form.Control
						type="text"
						name="name"
						value={this.state.name}
						placeholder="Map Name"
						onChange={this.onChange}
					/>
					<Button variant="primary" type="submit">
						Save Map
					</Button>
				</Form>
			</div>
		);
	}
}

const mapState = (state) => ({
	markers: state.markers,
	search: state.search,
	maps: state.maps,
});

const mapDispatch = (dispatch) => ({
	createMap: (search, markers, body) =>
		dispatch(createMap(search, markers, body)),
	fetchMaps: () => dispatch(fetchMaps()),
	addMarkers: (businesses) => dispatch(addMarkers(businesses)),
});

export default connect(mapState, mapDispatch)(Map);
