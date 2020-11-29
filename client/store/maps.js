import axios from "axios";

const CREATED_MAP = "CREATED_MAP";

const createdMap = (map) => ({ type: CREATED_MAP, map });

export const createMap = (search, markers, body) => async (dispatch) => {
	try {
		const { data } = await axios.post("/api/maps", { search, markers, body });
		dispatch(createdMap(data));
	} catch (error) {
		console.error(error);
	}
};

const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATED_MAP:
			return [...state, action.map];
		default:
			return state;
	}
};
