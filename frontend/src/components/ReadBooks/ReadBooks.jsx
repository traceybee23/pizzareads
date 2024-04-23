import { useSelector } from 'react-redux';
import DeleteProgressButton from '../DeleteProgressModal/DeleteProgressButton';
import './ReadBooks.css';

const ReadBooks = () => {

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
            className="book-progress-cards"
            key={progress.id}
          >
            <>
              <img className="progress-image" src={progress.Book.coverImageUrl} onClick={() => navigate(`/books/${progress.Book.id}`)} />
              <div className="progress-deets">
                <span className="progress-title">{progress.Book.title}</span>
                <span className="progress-author">by {progress.Book.author}</span>
                <div className="progress-buttons">
                  <DeleteProgressButton progressId={progress.id} />
                </div>
              </div>
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
