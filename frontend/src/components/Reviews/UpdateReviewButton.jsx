import OpenModalButton from "../OpenModalButton";
import UpdateReviewModal from "./UpdateReviewModal";

const UpdateReviewButton = ({reviewId, bookId}) => {

  return (
    <OpenModalButton
    buttonText="edit"
    reviewId={reviewId}
    modalComponent={<UpdateReviewModal reviewId={reviewId} bookId={bookId} />}
    />
  )
}

export default UpdateReviewButton;
