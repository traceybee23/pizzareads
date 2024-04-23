import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import './ReadBooks.css';

const ReadBooks = () => {

  const navigate = useNavigate();
  const user = useSelector(state => state.session.user)

  const progresses = Object.values(useSelector(state => state.progress))

  console.log(user, progresses, "DFJHSKDJFHKFDJH")

  return (
    progresses &&
    <>
      <h1>
        books that you have completed
      </h1>
      <div className="book-progress-completed">
        {user && progresses && progresses.map(progress => (
          progress.completed === true &&
          progress.Book &&
          <div
            className="book-read-cards"
            key={progress.id}
          >
            <>
              <img className="read-image" src={progress.Book.coverImageUrl} onClick={() => navigate(`/books/${progress.Book.id}`)} />

            </>
          </div>
        ))}
      </div>
      <img className="purple-grid" src="../../purple-grid.png" />
      <img className="ribbon-accent" src="../../ribbon-accent.png" />
      <img className="blue-grid" src="../../blue-grid.png" />
    </>
  )
}

export default ReadBooks;
