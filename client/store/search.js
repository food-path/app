//we need to save our search data and save it with the map

//ACTION TYPES
const SAVE_SEARCH = "SAVE_SEARCH";

//ACTION CREATORS
export const saveSearch = (search) => ({ type: SAVE_SEARCH, search });

//REDUCER
const initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
		case SAVE_SEARCH:
			return action.search;
		default:
			return state;
	}
};
