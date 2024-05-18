import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import './ReadBooks.css';

const ReadBooks = () => {

  const navigate = useNavigate();
  const user = useSelector(state => state.session.user)

  const progresses = Object.values(useSelector(state => state.progress))


  return (
    progresses &&
    <div className='book-trophies-page'>
      <h1>
        book trophies
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
      <img className="purple-grid-2" src="../../purple-grid.png" />
      <img className="ribbon-accent-2" src="../../ribbon-accent.png" />
      <img className="blue-grid-2" src="../../blue-grid.png" />
    </div>
  )
}

export default ReadBooks;
