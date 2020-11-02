import axios from "axios";

const GOT_USER = "GOT_USER";

const gotUser = (user) => ({ type: GOT_USER, user });

export const auth = (body) => async (dispatch) => {
	try {
		const { data } = await axios.post("/auth/login", body);
		dispatch(gotUser(data));
	} catch (error) {
		console.error(error);
	}
};

const initialState = {};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case GOT_USER:
			return action.user;
		default:
			return state;
	}
}
