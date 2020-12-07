import axios from "axios";

//ACTION TYPES
const CREATED_MAP = "CREATED_MAP";
const GOT_MAPS = "GOT_MAPS";
const DELETED_MAP = "DELETED MAP";

//ACTION CREATORS
const createdMap = (map) => ({ type: CREATED_MAP, map });
const gotMaps = (maps) => ({ type: GOT_MAPS, maps });
const deletedMap = (id) => ({ type: DELETED_MAP, id });

//THUNK CREATORS
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

export const deleteMap = (id) => async (dispatch) => {
	try {
		await axios.delete(`/api/maps/${id}`);
		dispatch(deletedMap(id));
	} catch (error) {
		console.error(error);
	}
};

//REDUCER
const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATED_MAP:
			return [...state, action.map];
		case GOT_MAPS:
			return action.maps;
		case DELETED_MAP:
			return state.filter((map) => map.id !== +action.id);
		default:
			return state;
	}
};
