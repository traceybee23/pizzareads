import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoogleBooks } from '../../store/books'; // Modify this action according to your implementation
import { Link } from 'react-router-dom';
import './BooksList.css';

const BooksList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, books, itemCount } = useSelector(state => state.books);

  console.log(loading, error, books, itemCount, "())()()()()(")

  useEffect(() => {
    dispatch(fetchGoogleBooks('', currentPage)); // Fetch books for the initial page
  }, [dispatch, currentPage]);

  const handleNextPage = () => {
    if (currentPage < itemCount) {
      setCurrentPage(currentPage + 1); // Increment page number
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Decrement page number
    }
  };

  return (
    <div className="books-page">
      <div className="books-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            {books && books.map(book => (
              <div className="book-card" key={book.id}>
                <Link className="book-link" to={`/books/${book.id}`}>
                  <img className="book-list-image" src={book.coverImageUrl} alt={book.title} />
                  <div className="book-details">
                    <span className="book-title">{book.title}</span>
                    <span className="book-author">{book.author}</span>
                    <span className="book-genre">{book.genre}</span>
                    <span className="book-description">{book.description}</span>
                  </div>
                </Link>
              </div>
            ))}
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              <span>Page {currentPage} of {itemCount}</span>
              <button onClick={handleNextPage} disabled={currentPage === itemCount}>Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BooksList;
