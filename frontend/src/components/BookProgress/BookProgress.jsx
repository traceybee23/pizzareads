import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './BookProgress.css'
import { fetchProgresses } from "../../store/progress";
import { useNavigate } from 'react-router-dom'
import UpdateButton from "../UpdateProgress/UpdateButton";
import { fetchBooks } from "../../store/books";
import DeleteProgressButton from "../DeleteProgressModal/DeleteProgressButton";
import GoalProgress from "./GoalProgress";
import { restoreUser } from "../../store/session";
import { fetchCoupons } from "../../store/userCoupons";


const BookProgress = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)

  const progresses = Object.values(useSelector(state => state.progress))


  useEffect(() => {
    dispatch(fetchBooks())
    dispatch(fetchProgresses(user.id))
    .then(() => dispatch(restoreUser()))

    dispatch(fetchCoupons())

  }, [dispatch, user.id])


  const percentage = (x, y) => {
    let total = +x
    let read = +y
    let per = (read / total) * 100
    return Math.floor(per)
  }

  return (
    progresses &&
    <>
      <h1 className="currentlyreading-h1">currently reading</h1>
      <div className="book-progress-container">
        {user && progresses && progresses.map(progress => (
          progress.completed === false &&
          progress.Book &&
          <div
            className="book-progress-cards"
            key={progress.id}
          >
            <>
              <img className="progress-image" src={progress.Book.coverImageUrl} onClick={() => navigate(`/books/${progress.Book.id}`)} />
              <div className="progress-deets">
                <span className="progress-title">{progress.Book.title}</span>
                <span className="progress-author">by {progress.Book.author}</span>
                <span className="progress-container">
                  <progress className="progressBar" value={progress.pagesRead} max={progress.Book.totalPages}>
                  </progress>&nbsp;&nbsp;
                  {percentage(`${progress.Book.totalPages}`, `${progress.pagesRead}`)}%</span>
                <div className="progress-buttons">
                  <UpdateButton progressId={progress.id} book={progress.Book} navigate={navigate}/>
                  <DeleteProgressButton progressId={progress.id} />
                </div>
              </div>
            </>
          </div>

        ))}
        {!progresses.length && <span>pick a book to add your progress here!</span>}
      </div>
      <GoalProgress />
    </>
  )
}

export default BookProgress;
