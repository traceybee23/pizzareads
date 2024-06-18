import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteProgressModal from "./DeleteProgressModal";
import { FaRegTrashAlt } from "react-icons/fa";


const DeleteProgressButton = (progressId) => {
  return (
    <OpenModalButton
      buttonText={
        <span className="currently-reading">
          <span className="book-icon"><FaRegTrashAlt /></span>
          <span className="cr-text"></span>
        </span>
      }
      progressId={progressId}
      modalComponent={<DeleteProgressModal progressId={progressId} />}
    />
  )
}

export default DeleteProgressButton;
