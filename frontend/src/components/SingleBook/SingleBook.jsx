import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleBook } from '../../store/books';
import ProgressButton from '../ProgressFormModal/ProgressButton';
import './SingleBook.css'

const SingleBook = () => {

  const { bookId } = useParams();

  const book = useSelector(state => state.books ? state.books[bookId] : null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleBook(bookId));
  }, [dispatch, bookId])


  return (
    book &&
    <div className='single-book-card'>
      <div className='image-container'>
        <img className='book-image' src={book.coverImageUrl} />
          <div className='curr-read-butt'>
            <ProgressButton />
          </div>
      </div>
      <div className='single-book-deets'>
        <span className='single-book-title'>{book.title}</span>
        <span className='single-book-author'>{book.author}</span>
        <span>Genre: {book.genre}</span>
        <span className='single-book-desc' >{book.description}</span>
        <span>Total Pages: {book.totalPages}</span>
        <span>Published: {book.publishedDate}</span>
        <span>ISBN: {book.isbn}</span>
      </div>
    </div>
  )
}

export default SingleBook;
