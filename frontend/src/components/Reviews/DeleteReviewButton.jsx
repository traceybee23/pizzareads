import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "./DeleteReviewModal"

const DeleteReviewButton = ({reviewId, bookId}) => {

  return (
    <OpenModalButton
    buttonText="delete"
    reviewId={reviewId}
    modalComponent={<DeleteReviewModal reviewId={reviewId} bookId={bookId}/>}
    />
  )
}

export default DeleteReviewButton;
