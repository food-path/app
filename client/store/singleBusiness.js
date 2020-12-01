import axios from "axios";

//Action type
const GET_BUSINESS = 'GET_BUSINESS'

//Action Creator
export const getBusiness = (business) => {
  return {
    type: GET_BUSINESS,
    business,
  };
};

//thunk
export const fetchSingleBusiness = (id) => {
    console.log('i am in fetchSingleBusiness')
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/maps/${id}`);
      dispatch(getBusiness(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {}; //object for single business
export default function businessReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BUSINESS:
      return action.business;
    default:
      return state;
  }
}
