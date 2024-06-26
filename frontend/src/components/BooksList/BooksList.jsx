import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoogleBooks } from '../../store/books'; // Modify this action according to your implementation
import { Link } from 'react-router-dom';
import { selectSearchQuery } from '../../store/search';
import './BooksList.css';

const BooksList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { error, books, pageCount } = useSelector(state => state.books);

  const searchQuery = useSelector(selectSearchQuery);
  const [load, setLoad] = useState(true)

  useEffect(() => {
    setLoad(true);
    dispatch(fetchGoogleBooks(searchQuery)).then(() => setTimeout(() => {
      setLoad(false);
    }, 1000))
    // Fetch books for the initial page
  }, [dispatch, searchQuery]);

  const itemsPerPage = 10; // 10 items per page

  const handleNextPage = (e) => {
    e.preventDefault();

    setLoad(true);

    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;

    if (nextPage <= pageCount) {
      setCurrentPage(nextPage); // Increment page number
      dispatch(fetchGoogleBooks(searchQuery, startIndex, itemsPerPage)).then(() => setTimeout(() => {
        setLoad(false);
      }, 1000)); // Fetch books for the next page
    }
    window.scrollTo(0, 0);
  };

  const handlePrevPage = (e) => {
    e.preventDefault

    setLoad(true);

    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const startIndex = (prevPage - 1) * itemsPerPage;

      setCurrentPage(prevPage); // Decrement page number
      dispatch(fetchGoogleBooks(searchQuery, startIndex, itemsPerPage)).then(() => setTimeout(() => {
        setLoad(false);
      }, 1000)); // Fetch books for the previous page
    }
    window.scrollTo(0, 0);
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
        <div className='books-wrapper'>
          {load ? (
            <div className='bookslist-loader'>
              <div className="loader"></div>
            </div>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <>
              {books && books.map(book => (
                <div className="book-card" key={book.id}>
                  <Link className="book-link" to={`/books/${book.id}`}>
                    {
                      book?.coverImageUrl !== 'No cover image available' ? (
                        <img className='book-list-image' src={book?.coverImageUrl} alt={book.title} />
                      ) : (
                        <img className='book-list-image' src='../no-cover.png' alt='no image' />
                      )
                    }
                    <div className="book-details">
                      <span className="book-title">{book.title}</span>
                      <span className="book-author">{book.author}</span>
                      <span className="book-genre">{book.genre}</span>
                      <span className="book-description">{descriptionSubstr(book.description)}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
        {!load &&
          <div className="pagination">
            {currentPage !== 1 &&
              <button onClick={handlePrevPage} disabled={currentPage === 1}>&lt;</button>
            }
            <span>&nbsp;Page {currentPage} of {pageCount}&nbsp;</span>
            {currentPage !== pageCount &&
              <button onClick={handleNextPage} disabled={currentPage === pageCount}>&gt;</button>
            }
          </div>
        }
      </div>

    </div>
  );
};

export default BooksList;
