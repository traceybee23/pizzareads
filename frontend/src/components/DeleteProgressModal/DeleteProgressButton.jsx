import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteProgressModal from "./DeleteProgressModal";
import { GiTrashCan } from "react-icons/gi";


const DeleteProgressButton = (progressId) => {
  return (
    <OpenModalButton
      buttonText={
        <span className="currently-reading">
          <span className="book-icon"><GiTrashCan /></span>
          <span className="cr-text">&nbsp;delete progress</span>
        </span>
      }
      progressId={progressId}
      modalComponent={<DeleteProgressModal progressId={progressId} />}
    />
  )
}

export default DeleteProgressButton;
