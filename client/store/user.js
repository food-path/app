import axios from "axios";
import history from '../history'

//ACTION TYPE
const GOT_USER = "GOT_USER";
const REMOVE_USER = 'REMOVE_USER'

//INITIAL STATE
const defaultUser = {};

//ACTION CREATORS
const getUser = user => ({ type: GOT_USER, user });
const removeUser = () => ({type: REMOVE_USER})

//THUNK CREATORS
export const me = () => async dispatch => {
	try {
	  const res = await axios.get('/auth/me')
	  dispatch(getUser(res.data || defaultUser))
	} catch (err) {
	  console.error(err)
	}
  }

export const auth = (email, password, method, firstName, lastName) => async dispatch => {
	let res
	try {
		res = await axios.post(`/auth/${method}`, {email, password, firstName, lastName})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
	try {
	  await axios.post('/auth/logout')
	  dispatch(removeUser())
	  history.push('/login')
	} catch (err) {
	  console.error(err)
	}
  }

export const register = (body) => async (dispatch) => {};

// const initialState = {};

//REDUCER
export default function userReducer(state = defaultUser, action) {
	switch (action.type) {
		case GOT_USER:
			return action.user;
		case REMOVE_USER:
      		return defaultUser
		default:
			return state;
	}
}

