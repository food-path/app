//this is the store for the OtherProfile component

import axios from "axios";

//ACTION TYPE
const GOT_OTHER_USER = "GOT_OTHER_USER";
export const ADDED_FRIEND = "ADDED_FRIEND";

//INITIAL STATE
const defaultUser = {};

//ACTION CREATORS
const gotOtherUser = (user) => ({ type: GOT_OTHER_USER, user });
const addedFriend = (user, friend) => ({ type: ADDED_FRIEND, user, friend });

//THUNK CREATORS
// auth/me: a way of checking and making sure specific user is logged in.
export const fetchOtherUser = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/users/${id}`);
		dispatch(gotOtherUser(res.data || defaultUser));
	} catch (error) {
		console.error(error);
	}
};

//getState is a function that when invoked will grab the redux state
export const addFriend = () => async (dispatch, getState) => {
	try {
		await axios.put(`/api/users/addFriend/${getState().otherUser.id}`);
		dispatch(addedFriend(getState().user, getState().otherUser));
	} catch (error) {
		console.error(error);
	}
};

//REDUCER
export default function userReducer(state = defaultUser, action) {
	switch (action.type) {
		case GOT_OTHER_USER:
			return action.user;
		case ADDED_FRIEND:
			return { ...state, friends: [...state.friends, action.user] };
		default:
			return state;
	}
}
