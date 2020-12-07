//this is the store for the OtherProfile component

import axios from "axios";

//ACTION TYPE
const GOT_OTHER_USER = "GOT_OTHER_USER";

//INITIAL STATE
const defaultUser = {};

//ACTION CREATORS
const gotOtherUser = (user) => ({ type: GOT_OTHER_USER, user });

//THUNK CREATORS
// auth/me: a way of checking and making sure specific user is logged in.
export const fetchOtherUser = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/users/${id}`);
		dispatch(gotOtherUser(res.data || defaultUser));
	} catch (err) {
		console.error(err);
	}
};

//REDUCER
export default function userReducer(state = defaultUser, action) {
	switch (action.type) {
		case GOT_OTHER_USER:
			return action.user;
		default:
			return state;
	}
}
