import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './BookProgress.css'
import { fetchProgresses } from "../../store/progress";
import { useNavigate } from 'react-router-dom'
import UpdateButton from "../UpdateProgress/UpdateButton";
import DeleteProgressButton from "../DeleteProgressModal/DeleteProgressButton";

import { restoreUser } from "../../store/session";



const BookProgress = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)

  const progresses = Object.values(useSelector(state => state.progress))

  const completed = progresses.filter(progress => progress.completed === false)

  const [className, setClassName] = useState('book-progress-container')
  const [load, setLoad] = useState(true)


  useEffect(() => {
    setLoad(true);

    dispatch(restoreUser())
    .then(() => dispatch(fetchProgresses(user.id)))
      .then(() => setTimeout(() => {
        setLoad(false);
      }, 500))

    if (completed.length <= 2) {
      setClassName('no-scroll')
    } else {
      setClassName('book-progress-container')
    }

  }, [dispatch, user.id, completed.length])


  const percentage = (x, y) => {
    let total = +x
    let read = +y
    let per = (read / total) * 100
    return Math.floor(per)
  }

  return (
    progresses &&
    <div className="cr-container">
      <h1 id="currently-reading" className="heading">currently reading</h1>
      {load ? (
        <div className='bookslist-loader'>
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className={className}>
            {user && progresses && progresses.map(progress => (
              progress.completed === false &&
              <div
                className="book-progress-cards"
                key={progress.id}
              >
                <>
                  <img
                    className="progress-image"
                    src={progress.coverImageUrl}
                    onClick={() => navigate(`/books/${progress.bookId}`)}
                  />
                  <div className="progress-deets">
                    <span className="progress-title">{progress.title}</span>
                    <span className="progress-author">by {progress.author}</span>
                    <span className="progress-container">
                      <progress
                        className="progressBar"
                        value={progress.pagesRead}
                        max={progress.totalPages}
                      ></progress>&nbsp;&nbsp;
                      {percentage(
                        `${progress.totalPages}`,
                        `${progress.pagesRead}`
                      )}%</span>
                    <div className="progress-buttons">
                      <UpdateButton
                        progressId={progress.id}
                        book={progress}
                        navigate={navigate} />
                      <DeleteProgressButton progressId={progress.id} />
                    </div>
                  </div>
                </>
              </div>
            ))}
            {!completed.length && !!progresses.length && <span>pick a book to add your progress here!</span>}
            {!progresses.length && <span>pick a book to add your progress here!</span>}
          </div>
        </>
      )}

    </div>
  )
}

export default BookProgress;
