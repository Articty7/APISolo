import { csrfFetch } from './csrf';

const GET_REVIEWS = "reviews/getReviews";
const POST_REVIEW = "reviews/postReview";
const REMOVE_REVIEW = "reviws/removeReview";

const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    payload: reviews
  };
};

const postReview = (review) => {
  return {
    type: POST_REVIEW,
    payload: review
  };
};

const removeReview = (reviewId) => {
  return {
    type: REMOVE_REVIEW,
    payload: reviewId
  };
};

export const getAllReviewsSpotId = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const data = await response.json();
  dispatch(getReviews(data.Reviews));
  return response;
};

// export const getSpotById = (spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spotId}`);
//   const data = await response.json();
//   dispatch(postSpot(data));
//   return response;
// }

export const createNewReview = (curReview) => async (dispatch) => {
  const { spotId, review, stars } = curReview;
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify({
      review,
      stars
    })
  });
  const data = await response.json();
  dispatch(postReview(data.spot));
  return response;
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  });
  dispatch(removeReview(reviewId));
  return response;
}

const initialState = { reviews: null, review: null };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return { ...state, reviews: action.payload };
    case POST_REVIEW:
      return { ...state, review: action.payload };
    case REMOVE_REVIEW:
      return {...state, reviews: state.reviews.filter((review) => review.id !== action.payload)};
    default:
      return state;
  }
};

export default reviewsReducer;