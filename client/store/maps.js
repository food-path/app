import axios from "axios";

const CREATED_MAP = "CREATED_MAP";
const GOT_MAPS = "GOT_MAPS";

const createdMap = (map) => ({ type: CREATED_MAP, map });
const gotMaps = (maps) => ({ type: GOT_MAPS, maps });

export const createMap = (search, markers, body) => async (dispatch) => {
	try {
		const { data } = await axios.post("/api/maps", { search, markers, body });
		dispatch(createdMap(data));
	} catch (error) {
		console.error(error);
	}
};

export const fetchMaps = () => async (dispatch) => {
	try {
		const { data } = await axios.get("/api/maps");
		dispatch(gotMaps(data));
	} catch (error) {
		console.error(error);
	}
};

const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATED_MAP:
			return [...state, action.map];
		case GOT_MAPS:
			return action.maps;
		default:
			return state;
	}
};
