import axios from "axios";

//ACTION TYPES
const GOT_MARKERS = "GOT_MARKERS";
const ADD_MARKERS = "ADD_MARKERS";
const REMOVE_MARKER = "REMOVE_MARKER";

//ACTION CREATORS
export const gotMarkers = (markers) => ({ type: GOT_MARKERS, markers });

export const addMarkers = (businesses) => ({
	type: ADD_MARKERS,
	businesses,
});

export const removeMarker = (id) => ({
	type: REMOVE_MARKER,
	id,
});

//THUNK CREATORS
export const fetchMarkers = (body) => async (dispatch) => {
	try {
		const { data } = await axios.post("/api/yelp/search", body);
		dispatch(gotMarkers(data));
	} catch (error) {
		console.error(error);
	}
};

//REDUCER
const initialState = [];

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
					price: business.price,
					rating: business.rating,
				})),
			];
		case REMOVE_MARKER:
			return state.filter((marker) => marker.id !== action.id);
		default:
			return state;
	}
};
