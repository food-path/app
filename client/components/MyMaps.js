import React from "react";
import { connect } from "react-redux";
import { fetchMaps, deleteMap, gotMarkers, addMarkers } from "../store";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

class MyMaps extends React.Component {
	componentDidMount() {
		this.props.fetchMaps();
	}
	render() {
		const myMaps = this.props.maps.filter(
			(map) => map.user && map.user.id === this.props.user.id
		);
		return (
			<div>
				<ul>
					{myMaps.map((map) => (
						<li className="elements-saved-maps" key={map.id}>
							<Link
								to="/map"
								onClick={() => {
									this.props.gotMarkers([]);
									this.props.addMarkers(map.businesses);
								}}
							>
								<p>{map.name}</p>
							</Link>

							<p className="businessid">{map.businesses.length}</p>
							<Button className="btn-delete-map" variant="outline-primary" 
							size="sm"
							onClick={() => this.props.deleteMap(map.id)}>X</Button>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

const mapState = (state) => ({
	user: state.user,
	maps: state.maps,
});

const mapDispatch = (dispatch) => ({
	fetchMaps: () => dispatch(fetchMaps()),
	deleteMap: (id) => dispatch(deleteMap(id)),
	gotMarkers: (markers) => dispatch(gotMarkers(markers)),
	addMarkers: (businesses) => dispatch(addMarkers(businesses)),
});

export default connect(mapState, mapDispatch)(MyMaps);
