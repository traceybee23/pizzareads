import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateReviewModal from "./CreateReviewModal";
import './Reviews.css'

const ReviewButton = ({bookId}) => {

  return (
    <OpenModalButton
      buttonText="post your review"
      modalComponent={<CreateReviewModal bookId={bookId}/>}
      />
  )
}

export default ReviewButton;
