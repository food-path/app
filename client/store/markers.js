import axios from "axios";

const GOT_MARKERS = "GOT_MARKERS";

const gotMarkers = (markers) => ({ type: GOT_MARKERS, markers });

export const fetchMarkers = (location) => async (dispatch) => {
	try {
		const { data } = await axios.get(`/api/yelp/search/${location}`);
		dispatch(gotMarkers(data));
	} catch (error) {
		console.error(error);
	}
};

const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case GOT_MARKERS:
			return action.markers;
		default:
			return state;
	}
};
