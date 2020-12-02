import axios from "axios";

//Action type
const GET_BUSINESS = "GET_BUSINESS";
const GET_BUSINESS_DETAILS = "GET_BUSINESS_DETAILS";

//Action Creator
export const getBusiness = (business) => {
  return {
    type: GET_BUSINESS,
    business,
  };
};

export const getBusinessDetails = (business) => {
  return {
    type: GET_BUSINESS_DETAILS,
    business,
  };
};

//thunk
export const fetchSingleBusiness = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/maps/${id}`);
      dispatch(getBusiness(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchSingleBusinessDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/yelp/search/businesses/${id}`);
      dispatch(getBusinessDetails(data));
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
    case GET_BUSINESS_DETAILS:
      return action.business;
    default:
      return state;
  }
}
