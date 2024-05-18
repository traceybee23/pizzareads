import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import { fetchReviews, updateReview } from "../../store/reviews";
import StarRatingInput from "./StarRatingInput";
import { fetchSingleBook } from "../../store/books";


const UpdateReviewModal = ({ reviewId, bookId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const reviewData = useSelector(state => state.reviews[reviewId])
  const [review, setReview] = useState(reviewData?.review)
  const [stars, setStars] = useState(reviewData?.stars)
  const [errors, setErrors] = useState({});


  useEffect(() => {
    let errObj = {}
    if (!review) errObj.review = "review is required."
    if (review && review.length < 10) errObj.review = "reviews must be at least 10 characters in length.";
    if (review && review.length > 2000) errObj.review = "reviews must be 2000 characters in length at most.";
    if (!stars) errObj.stars = "star rating is required."
    setErrors(errObj);
  }, [review, stars])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})

    const reviewData = {
      review,
      stars
    }

    try {
      await dispatch(updateReview(reviewId, reviewData))
      await dispatch(fetchSingleBook(bookId))
      await dispatch(fetchReviews(bookId))
      .then(closeModal)

    } catch (error) {
      console.error("Error updating review", error);
    }
  }
  const onChange = (number) => {
    setStars(parseInt(number))
  }

  return (
    <div className="reviewForm">
      <h2>update your review</h2>
      <form onSubmit={handleSubmit}>
        {errors.review && <span className='errors'>{errors.review}</span>}
        {errors.stars && <span className='errors'>{errors.stars}</span>}
        <textarea
            className='reviewTextArea'
            placeholder='Leave your review here...'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows="4"
          />
          <StarRatingInput
            onChange={onChange}
            stars={stars}
          />
          <button type='submit' disabled={(review.length < 10) || (!stars)}>update your review</button>
      </form>
    </div>
  )

}
export default UpdateReviewModal;
