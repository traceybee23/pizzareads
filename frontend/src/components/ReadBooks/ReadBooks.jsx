import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import './ReadBooks.css';
import { useEffect } from 'react';
import { fetchProgresses } from '../../store/progress';

const ReadBooks = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  const progresses = Object.values(useSelector(state => state.progress))


  useEffect(() => {
    dispatch(fetchProgresses(user.id))
  },[dispatch, user.id])


  return (
    progresses &&
    <div className='book-trophies-page'>
      <h1 className='heading'>
        book trophies
      </h1>
      <div className="book-progress-completed">
        {user && progresses.length && progresses.map(progress => (
          progress.completed === true ? (
          <div
            className="book-read-cards"
            key={progress.id}
          >
            <>
              <img className="read-image" src={progress.coverImageUrl} onClick={() => navigate(`/books/${progress.bookId}`)} />
            </>
          </div>
        ): (
          <div>the books you complete will be shown here</div>
        )))}
      </div>
    </div>
  )
}

export default ReadBooks;
