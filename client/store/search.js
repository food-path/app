//we need to save our search data and save it with the map

const SAVE_SEARCH = "SAVE_SEARCH";

export const saveSearch = (search) => ({ type: SAVE_SEARCH, search });

const initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
		case SAVE_SEARCH:
			return action.search;
		default:
			return state;
	}
};
