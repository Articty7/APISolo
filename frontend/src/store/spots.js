import { csrfFetch } from './csrf';

const GET_SPOTS = "spots/getSpots";
const POST_SPOT = "spots/postSpot";
const REMOVE_SPOT = "spots/removeSpot";

const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        payload: spots
    };
};

const postSpot = (spot) => {
  return {
    type: POST_SPOT,
    payload: spot
  };
};

const removeSpot = (spotId) => {
  return {
    type: REMOVE_SPOT,
    payload: spotId
  };
};

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const data = await response.json();
  dispatch(getSpots(data.Spots));
  return response;
};

export const getAllCurrUserSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");
  const data = await response.json();
  dispatch(getSpots(data.Spots));
  return response;
};

export const getSpotById = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const data = await response.json();
  dispatch(postSpot(data));
  return response;
};

export const createNewSpot = (spot) => async (dispatch) => {
  const { address, city, state, country, lat, lng, name, description, price } = spot;
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify({
      address, 
      city, 
      state, 
      country, 
      lat, 
      lng, 
      name, 
      description, 
      price
    })
  });
  const data = await response.json();
  dispatch(postSpot(data.spot));
  return response;
};

export const editSpot = (spot) => async (dispatch) => {
  const { address, city, state, country, lat, lng, name, description, price } = spot;
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    body: JSON.stringify({
      address, 
      city, 
      state, 
      country, 
      lat, 
      lng, 
      name, 
      description, 
      price
    })
  });
  const data = await response.json();
  dispatch(postSpot(data.spot));
  return response;
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE"
  });
  dispatch(removeSpot(spotId));
  return response;
}

const initialState = { spots: null, spot: null };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS:
      return { ...state, spots: action.payload };
    case POST_SPOT:
      return { ...state, spot: action.payload };
    case REMOVE_SPOT:
      return {...state, spots: state.spots.filter((spot) => spot.id !== action.payload)};
    default:
      return state;
  }
};

export default spotsReducer;