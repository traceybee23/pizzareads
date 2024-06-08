import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal';
import { deleteProgress } from '../../store/progress';
import './DeleteProgress.css'

const DeleteProgressModal = ({progressId}) => {

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = e => {
    e.preventDefault();
    dispatch(deleteProgress(progressId))
    .then(closeModal)

  }
  return (
    <>
    <div className='confirm-delete-modal'>
      <h1 className='heading'>confirm delete</h1>
      <span>are you sure you want to delete this reading progress?</span>
      <button  onClick={handleDelete}>yes (delete progress)</button>
      <button style={{backgroundColor: "#1B998B"}} onClick={closeModal}>no (keep progress)</button>
    </div>
    </>
  )
}

export default DeleteProgressModal;
