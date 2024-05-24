import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoogleBooks } from '../../store/books'; // Modify this action according to your implementation
import { Link } from 'react-router-dom';
import { selectSearchQuery } from '../../store/search';
import './BooksList.css';

const BooksList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, books, pageCount } = useSelector(state => state.books);
  const searchQuery = useSelector(selectSearchQuery);


  useEffect(() => {
    dispatch(fetchGoogleBooks(searchQuery)); // Fetch books for the initial page
  }, [dispatch, searchQuery]);

  const itemsPerPage = 10; // 10 items per page

  const handleNextPage = (e) => {
    e.preventDefault();
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    console.log(startIndex, "{}{}{}{}{}")
    if (nextPage <= pageCount) {
      setCurrentPage(nextPage); // Increment page number
      dispatch(fetchGoogleBooks(searchQuery, startIndex, itemsPerPage)); // Fetch books for the next page
    }
  };

  const handlePrevPage = (e) => {
    e.preventDefault
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const startIndex = (prevPage - 1) * itemsPerPage;
      setCurrentPage(prevPage); // Decrement page number
      dispatch(fetchGoogleBooks(searchQuery, startIndex, itemsPerPage)); // Fetch books for the previous page
    }
  };

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
                    <span className="book-description">{descriptionSubstr(book.description)}</span>
                  </div>
                </Link>
              </div>
            ))}
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              <span>Page {currentPage} of {pageCount}</span>
              <button onClick={handleNextPage} disabled={currentPage === pageCount}>Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BooksList;
