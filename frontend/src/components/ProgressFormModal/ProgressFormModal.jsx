import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import './ProgressForm.css'
import { createProgress } from '../../store/progress';
import { fetchProgresses } from '../../store/progress';


const ProgressFormModal = () => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)

  const book = Object.values(useSelector(state => state.books));

  const userProgress = Object.values(useSelector(state => state.progress));
  const bookId = book[0].id
  const totalPages = book[0].totalPages

  const bookProgress = userProgress.filter(progress => progress.bookId === bookId)

  console.log(bookProgress.length)

  const [pagesRead, setPagesRead] = useState(0);
  const [userId, setUserId] = useState('')
  const [errors, setErrors] = useState({});


  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({})

    if (user) setUserId(user.id)
    const newProgress = {
      userId,
      bookId,
      pagesRead
    }

    dispatch(createProgress(bookId, newProgress))
    dispatch(fetchProgresses(user.id))
      .then(closeModal)
      .catch(async (response) => {
        const data = await response.json();
        if (data && data.errors) {
          setErrors(data.errors)
          return errors
        }
    })
  }

  useEffect(() => {
    let errObj = {}

    if (!pagesRead) errObj.pagesRead = "pages read is required"

    if (pagesRead && pagesRead > totalPages) errObj.pagesRead = "pages read cannot be greater than total pages"

    if (pagesRead && !Number.isInteger(+pagesRead)) errObj.pagesRead = "pages read is invalid"

    setErrors(errObj)

  }, [pagesRead, totalPages, setErrors])

  return (
    <div>
      <h1>What page are you on?</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pagesRead}
          onChange={e => setPagesRead(e.target.value)}
          placeholder='pages read'
        />
        {errors.pagesRead && <span className="errors">&nbsp;{errors.pagesRead}</span>}
        <button
          className='add-book-progress'
          type='submit'
        >
          add book progress
        </button>
      </form>
    </div>
  )
}

export default ProgressFormModal;
