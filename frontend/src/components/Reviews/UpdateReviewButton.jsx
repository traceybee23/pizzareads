import OpenModalButton from "../OpenModalButton";
import UpdateReviewModal from "./UpdateReviewModal";
import { FaEdit } from "react-icons/fa";

const UpdateReviewButton = ({reviewId, bookId}) => {

  return (
    <OpenModalButton
    buttonText={
      <span className="currently-reading">
        <span className="book-icon"><FaEdit /></span>
      </span>
      }
    reviewId={reviewId}
    modalComponent={<UpdateReviewModal reviewId={reviewId} bookId={bookId} />}
    />
  )
}

export default UpdateReviewButton;
