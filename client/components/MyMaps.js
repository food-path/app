import React from "react";
import { connect } from "react-redux";
import { fetchMaps } from "../store";

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
						<li key={map.id}>
							<p>{map.name}</p>
							<p>{map.businesses.length}</p>
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
});

export default connect(mapState, mapDispatch)(MyMaps);
