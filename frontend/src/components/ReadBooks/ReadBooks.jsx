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

  console.log(progresses, 'READ BOOKS PAGE')

  useEffect(() => {
    dispatch(fetchProgresses(user.id))
  },[dispatch])


  return (
    progresses &&
    <div className='book-trophies-page'>
      <h1>
        book trophies
      </h1>
      <div className="book-progress-completed">
        {user && progresses && progresses.map(progress => (
          progress.completed === true &&
          <div
            className="book-read-cards"
            key={progress.id}
          >
            <>
              <img className="read-image" src={progress.bookDetails.coverImageUrl} onClick={() => navigate(`/books/${progress.bookId}`)} />
            </>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReadBooks;
