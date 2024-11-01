import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserReviews } from "../../store/reviews";
import { useNavigate } from 'react-router-dom'
import DeleteReviewButton from "../Reviews/DeleteReviewButton";
import UpdateReviewButton from "../Reviews/UpdateReviewButton";
import { FaStar } from "react-icons/fa";
import './UserReviews.css'

const UserReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userReviews = Object.values(useSelector(state => state.reviews))

  const [load, setLoad] = useState(true)

  useEffect(() => {
    setLoad(true);
    dispatch(fetchUserReviews()).then(() => setTimeout(() => {
      setLoad(false);
    }, 500));
  }, [dispatch]);

  const getDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.toLocaleString('default', { month: 'long' });
    const year = newDate.getFullYear();
    return ` ${month} ${day}, ${year}`;
  }

  return (
    <div className="user-reviews-container">
      <h1 className="heading">reviews</h1>
      {load ? (
        <div className='single-book-loader'>
          <div className="loader"></div>
        </div>
      ) : (
      userReviews && userReviews.map(review => (
        <div className="user-review-cards" key={review.id}>
          <img className="review-img" onClick={()=> navigate(`/books/${review.bookId}`)} src={review.coverImageUrl} />
          <div className="review-content-user">
            <div className="stars-in-card">
              {review.stars}&nbsp;&nbsp;<FaStar />
            </div>
            <div style={{ paddingBottom: "15px" }}>
              {review.createdAt &&
                getDate(review.createdAt)
              }
            </div>
            <div>
              {review.review}
            </div>

          </div>
          <span>
            <span className="deleteReviewButton"><DeleteReviewButton reviewId={review.id} bookId={review.bookId} /></span>
            <span className="deleteReviewButton"><UpdateReviewButton reviewId={review.id} bookId={review.bookId} /></span>
          </span>
        </div>
      )))}
    </div>
  )
}

export default UserReviews;
