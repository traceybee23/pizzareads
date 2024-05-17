import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateReviewModal from "./CreateReviewModal";
import './Reviews.css'

const ReviewButton = ({bookId}) => {

  return (
    <OpenModalButton
      buttonText="Post Your Review"
      modalComponent={<CreateReviewModal bookId={bookId}/>}
      />
  )
}

export default ReviewButton;
