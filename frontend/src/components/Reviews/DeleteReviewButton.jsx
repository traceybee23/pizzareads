import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "./DeleteReviewModal"
import { FaRegTrashAlt } from "react-icons/fa";

const DeleteReviewButton = ({ reviewId, bookId }) => {

  return (
    <OpenModalButton
      buttonText={
      <span className="currently-reading">
        <span className="book-icon"><FaRegTrashAlt /></span>
      </span>
      }
      reviewId={reviewId}
      modalComponent={<DeleteReviewModal reviewId={reviewId} bookId={bookId} />}
    />
  )
}

export default DeleteReviewButton;
