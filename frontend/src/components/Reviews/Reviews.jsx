import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './Reviews.css'
import { fetchSingleBook } from "../../store/books";
import DeleteReviewButton from "./DeleteReviewButton";
import UpdateReviewButton from "./UpdateReviewButton";


const Reviews = ({bookId}) => {

  const dispatch = useDispatch();

  const reviews = Object.values(useSelector(state => state.reviews))
  const sessionUser = useSelector(state => state.session.user);


  reviews.sort((a, b) => b.id - a.id)

  useEffect(() => {

    dispatch(fetchSingleBook(bookId))
  }, [dispatch, bookId])

  const getDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString('default', { month: 'long' });
    const year = newDate.getFullYear();
    return [month, ' ', year]
  }

  return (
    <>
      {reviews && reviews.map(review => (

        <li
        className="reviewsList"
        key={review.id}>

            <span className="review-username">
              {review.User?.username}&nbsp;&nbsp;&nbsp;
              <span style={{fontSize: "15px"}}>
                {review.createdAt &&
                  getDate(review.createdAt)
                }
              </span>
            </span>
            <span className="review-content">
              {review.review}&nbsp;&nbsp;&nbsp;
              {sessionUser && sessionUser.id === review.User?.id &&
              <span>
                <span className="deleteReviewButton"><DeleteReviewButton reviewId={review.id} bookId={bookId}/></span>
                <span className="deleteReviewButton"><UpdateReviewButton reviewId={review.id} bookId={bookId}/></span>
              </span>
              }
            </span>
        </li>
      ))}
    </>
  )

}


export default Reviews;
