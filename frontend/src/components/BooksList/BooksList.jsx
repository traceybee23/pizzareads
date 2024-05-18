import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from "../../store/books";
import { Link } from "react-router-dom";
import './BooksList.css'

const BooksList = () => {

  const dispatch = useDispatch();

  const books = Object.values(useSelector(state => state.books))

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  const descriptionSubstr = (text) => {
    if (text.length > 100) {
      return text.substring(0, 265) + '...'
    } else {
      return text
    }
  }

  return (
    <div className="books-page">
      <div className="books-container">
        <h1 className="books-header" >books</h1>
        {books && books.map(book => (
          <div
            className="book-cards"
            key={book.id}
          >
            <Link className="link-books" to={`/books/${book.id}`}>

              <img className='book-images' src={book.coverImageUrl} />
              <div className="book-deets">
                <span className="book-title">{book.title}</span>
                <span className="book-author">{book.author}</span>
                <span className="book-genre">{book.genre}</span>
                <span className="book-description">{descriptionSubstr(book.description)}</span>
              </div>

            </Link>

          </div>
        ))}
      </div>
      <img className="purple-grid-bookslist" src="../../purple-grid.png" />
      {/* <img className="pizza-dood-list" src="../../pizza-dood.png" /> */}
      <img className="ribbon-accent-bookslist" src="../../ribbon-accent.png" />
      <img className="blue-grid-bookslist" src="../../blue-grid.png" />
    </div>
  )
}

export default BooksList;
