const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'

const loadReviews = (reviews, bookId) => ({
  type: LOAD_REVIEWS,
  reviews,
  bookId
})

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
    default:
      return state
  }}

export default reviewsReducer;
