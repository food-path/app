import axios from "axios";

//ACTION TYPE
const REMOVE_USER = "REMOVE_USER";
const GOT_USER = "GOT_USER";
const EDITED_USER = "EDITED_USER";

//INITIAL STATE
const defaultUser = {};

//ACTION CREATORS
const getUser = (user) => ({ type: GOT_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const editedUser = (user) => ({ type: EDITED_USER, user });

//THUNK CREATORS
// auth/me: a way of checking and making sure specific user is logged in.
export const me = () => async (dispatch) => {
	try {
		const res = await axios.get("/auth/me");
		dispatch(getUser(res.data || defaultUser));
	} catch (err) {
		console.error(err);
	}
};

// auth/login looks for user with proper info in DB
export const auth = (body) => async (dispatch) => {
	try {
		const { data } = await axios.post(`/auth/login`, body);
		dispatch(getUser(data));
	} catch (error) {
		console.error(error);
	}
};

export const logout = () => async (dispatch) => {
	try {
		await axios.post("/auth/logout");
		dispatch(removeUser());
	} catch (err) {
		console.error(err);
	}
};

export const register = (body) => async (dispatch) => {
	try {
		const { data } = await axios.post("/auth/signup", body);
		dispatch(getUser(data));
	} catch (error) {
		console.error(error);
	}
};

export const editUser = (id, body) => async (dispatch) => {
	try {
		const { data } = await axios.put(`/api/users/${id}`, body);
		dispatch(editedUser(data));
	} catch (error) {
		console.error(error);
	}
};

//REDUCER
export default function userReducer(state = defaultUser, action) {
	switch (action.type) {
		case GOT_USER:
			return action.user;
		case REMOVE_USER:
			return defaultUser;
		case EDITED_USER:
			return action.user;
		default:
			return state;
	}
}
