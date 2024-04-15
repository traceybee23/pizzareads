import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal';
import { deleteProgress } from '../../store/progress';

const DeleteProgressModal = ({progressId}) => {

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = e => {
    e.preventDefault();
    dispatch(deleteProgress(progressId))
    .then(closeModal)
    .catch(async (response) => {
      const data = await response.json();
      return data;
    })
  }
  return (
    <>
    <div>
      <h1>confirm delete</h1>
      <span>are you sure you want to delete this reading progress?</span>
      <button onClick={handleDelete}>yes (delete progress)</button>
      <button style={{backgroundColor: "darkgrey"}} onClick={closeModal}>no (keep progress)</button>
    </div>
    </>
  )
}

export default DeleteProgressModal;
