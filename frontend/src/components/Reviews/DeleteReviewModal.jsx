import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReview, fetchReviews, fetchUserReviews } from '../../store/reviews';
import { fetchSingleBook } from '../../store/books';

const DeleteReview = ({reviewId, bookId}) => {


  const dispatch = useDispatch();

  const {closeModal} = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await dispatch(deleteReview(reviewId))
      await dispatch(fetchSingleBook(bookId))
      await dispatch(fetchReviews(+bookId))
      await dispatch(fetchUserReviews())
      .then(closeModal)
    } catch (error) {
      console.error("Error deleting review", error);
    }
  }

  return (
    <div className='reviewForm'>
      <h1 className='heading'>Confirm Delete</h1>
      <span>Are you sure you want to delete this review?</span>
      <button onClick={handleDelete}>Yes (Delete Review)</button>
      <button style={{backgroundColor: "darkgrey"}} onClick={closeModal}>No (Keep Review)</button>
    </div>
  )

}

export default DeleteReview;
