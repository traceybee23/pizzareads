import { fetchSingleBook } from "./books";
import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const UPDATE_REVIEW = 'review/UPDATE_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';
const LOAD_USER_REVIEWS = 'reviews/LOAD_USER_REVIEWS'


const loadReviews = (reviews, bookId) => ({
  type: LOAD_REVIEWS,
  reviews,
  bookId
})

const receiveReview = (review) => ({
  type: CREATE_REVIEW,
  review
})

const editReview = (review) => ({
  type: UPDATE_REVIEW,
  review
});

const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId
})

const loadUserReviews = (reviews) => ({
  type: LOAD_USER_REVIEWS,
  reviews
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
    dispatch(fetchSingleBook(bookId))

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

export const fetchUserReviews = () => async (dispatch) => {
  const response = await fetch(`/api/reviews/current`)

  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadUserReviews(reviews))
  } else {
    const errors = await response.json();
    return errors;
  }
}

export const updateReview = (reviewId, review) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...review })
  });

  if (response.ok) {
    const updatedReview = await response.json();
    dispatch(editReview(updatedReview));
    return updatedReview
  } else {
    const errors = await response.json();
    return errors;
  }
}

export const deleteReview = (reviewId) => async (dispatch) => {

  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(removeReview(reviewId));
  } else {
    const errors = await response.json();
    return errors;
  }
}

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const reviewState = {}
      if (action.reviews.Reviews !== "New") {
        action.reviews.Reviews.forEach(review => {
          reviewState[review.id] = review
          })
        reviewState["AvgStars"] = action.reviews.AvgStars
      }
      return reviewState
    }
    case CREATE_REVIEW: {
      const reviewState = { ...state }
      reviewState[action.review.id] = action.review
      return reviewState
    }
    case UPDATE_REVIEW: {
      return { ...state, [action.review.id]: action.review }
    }
    case LOAD_USER_REVIEWS: {
      const reviewState = {}
      action.reviews.reviews.forEach(review => {
        reviewState[review.id]= review
      })
      return reviewState
    }
    case REMOVE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }
    default:
      return state
  }
}

export default reviewsReducer;
