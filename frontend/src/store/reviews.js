import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';


const loadReviews = (reviews, bookId) => ({
  type: LOAD_REVIEWS,
  reviews,
  bookId
})

const receiveReview = (review, bookId) => ({
  type: CREATE_REVIEW,
  review,
  bookId
})

export const createReview = (bookId, review) => async (dispatch, getState) => {
  const sessionUser = getState().session.user;

  const response = await csrfFetch(`/api/books/${bookId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...review, userId: sessionUser.id }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(receiveReview(data));
    dispatch(fetchReviews(bookId))

    return data;
  } else {
    const errors = await response.json();
    return errors;
  }
};


export const fetchReviews = (bookId) => async (dispatch) => {

  const response = await fetch(`/api/books/${bookId}/reviews`)

  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews, bookId))
  } else {
    const errors = await response.json();
    return errors;
  }
}

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const reviewState = {}
      if(action.reviews.Reviews !== "New") {
        action.reviews.Reviews.forEach(review => {
          reviewState[review.id] = review
        })
      }
      return reviewState
    }
    case CREATE_REVIEW : {
      const reviewState = {...state}
      reviewState[action.review.id] = action.review
      return reviewState
    }
    default:
      return state
  }}

export default reviewsReducer;
