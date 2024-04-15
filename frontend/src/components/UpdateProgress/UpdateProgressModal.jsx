import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { updateProgress } from '../../store/progress';
import { fetchProgresses } from '../../store/progress';
import { fetchBooks } from '../../store/books';

const UpdateProgressModal = ({progressId, book}) => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)

  let currPagesRead;

  const userProgress = Object.values(useSelector(state => state.progress))

  const bookProgress = userProgress.filter(progress => progress.bookId === book.id)

  bookProgress.map(progress => {
    currPagesRead = progress.pagesRead
  })

  const totalPages = book.totalPages

  const [pagesRead, setPagesRead] = useState(currPagesRead);

  const [errors, setErrors] = useState({});


  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({})

    const updatedProgress = {
      pagesRead
    }

    dispatch(updateProgress(progressId, updatedProgress))
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
    dispatch(fetchBooks())
  }, [dispatch])

  useEffect(() => {
    let errObj = {}

    if (!pagesRead) errObj.pagesRead = "pages read is required"

    if (pagesRead && pagesRead > totalPages) errObj.pagesRead = "pages read cannot be greater than total pages"

    if (pagesRead && !Number.isInteger(+pagesRead)) errObj.pagesRead = "pages read is invalid"

    if (pagesRead && pagesRead < currPagesRead) errObj.pagesRead = "pages read must be greater than your previous progress"
    setErrors(errObj)

  }, [pagesRead, totalPages, setErrors, currPagesRead])


  return (
    user &&
    <div className='progress-form'>
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
          disabled={!!Object.values(errors).length}
          className='add-book-progress'
          type='submit'
        >
          update book progress
        </button>
      </form>
    </div>
  )
}

export default UpdateProgressModal;
