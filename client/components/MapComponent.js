import React from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import { createMap, fetchMaps, addMarkers, removeMarker } from "../store";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import SingleBusiness from "./SingleBusiness";
import BusinessesList from "./BusinessesList";


const Marker = ({ text, imageUrl, id }) => (
	<div
		className="marker"
		style={{ textAlign: "center", display: "block", width: "60px" }}
	>
		<p>{text}</p>
		<img src={imageUrl} width="60px" />
		<Link to={`/singleBusiness/${id}`}>
			<img src="/img/marker.png" height="30px" />
		</Link>
	</div>
);

class MapComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			center: { lat: 40.74, lng: -73.98 },
			name: "",
			mapToAddId: "default",
			mapSaved:false
		};
		this.onChange = this.onChange.bind(this);
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
		this.state.mapSaved = true
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
						center={this.state.center}
					>
						{markers.map((marker) => (
							<Marker
								key={marker.id}
								lat={marker.coordinates.latitude}
								lng={marker.coordinates.longitude}
								text={marker.name}
								imageUrl={marker.image_url}
								id={marker.id}
							/>
						))}
					</GoogleMapReact>
				</div>
				<BusinessesList props={this.props} />
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
								{m.name} by {m.user ? m.user.firstName : "Anonymous"}
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
					{this.state.mapSaved ?<Link to="/myMaps">Map Saved! Click here to view your saved map</Link>:null}
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
	removeMarker: (id) => dispatch(removeMarker(id)),
});

export default connect(mapState, mapDispatch)(MapComponent);
