import axios from "axios";

//ACTION TYPE
const REMOVE_USER = "REMOVE_USER";
const GOT_USER = "GOT_USER";

//INITIAL STATE
const defaultUser = {};

//ACTION CREATORS
const getUser = (user) => ({ type: GOT_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

//THUNK CREATORS
export const me = () => async (dispatch) => {
	try {
		const res = await axios.get("/auth/me");
		dispatch(getUser(res.data || defaultUser));
	} catch (err) {
		console.error(err);
	}
};

export const auth = (body) => async (dispatch) => {
	try {
		const { data } = await axios.post(`/auth/login`, body);
		dispatch(getUser(data));
	} catch (error) {
		console.error(error);
	}
};

//   try {
//     dispatch(getUser(res.data))
//     history.push('/')
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr)
//   }
// }

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

//REDUCER
export default function userReducer(state = defaultUser, action) {
	switch (action.type) {
		case GOT_USER:
			return action.user;
		case REMOVE_USER:
			return defaultUser;
		default:
			return state;
	}
}
