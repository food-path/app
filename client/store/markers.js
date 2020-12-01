import axios from "axios";

const GOT_MARKERS = "GOT_MARKERS";
const ADD_MARKERS = "ADD_MARKERS";

const gotMarkers = (markers) => ({ type: GOT_MARKERS, markers });

export const addMarkers = (businesses) => ({
	type: ADD_MARKERS,
	businesses,
});

export const fetchMarkers = (body) => async (dispatch) => {
	try {
		const { data } = await axios.post("/api/yelp/search", body);
		dispatch(gotMarkers(data));
	} catch (error) {
		console.error(error);
	}
};

const initialState = []; // [{},{}] array of business Objects

export default (state = initialState, action) => {
	switch (action.type) {
		case GOT_MARKERS:
			return action.markers;
		case ADD_MARKERS:
			return [
				...state,
				...action.businesses.map((business) => ({
					id: business.id,
					coordinates: {
						latitude: business.latitude,
						longitude: business.longitude,
					},
					name: business.name,
					image_url: business.imageUrl,
				})),
			];
		default:
			return state;
	}
};
