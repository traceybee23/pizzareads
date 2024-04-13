import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleBook } from '../../store/books';
import { GiOpenBook } from "react-icons/gi";
import './SingleBook.css'
import ProgressFormModal from '../ProgressFormModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';


const SingleBook = () => {

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const { bookId } = useParams();

  const book = useSelector(state => state.books ? state.books[bookId] : null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleBook(bookId));
  }, [dispatch, bookId])

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  return (
    book &&
    <div className='single-book-card'>
      <div className='image-container'>
        <img className='book-image' src={book.coverImageUrl} />
        <button className='curr-read-butt'>
          <OpenModalMenuItem
            itemText={
              <span className='currently-reading'>
                <span className='book-icon'>
                  <GiOpenBook />
                </span>
                <span className='cr-text'>&nbsp;currently reading </span>
              </span>
            }
            onItemClick={closeMenu}
            modalComponent={<ProgressFormModal />}
          />
        </button>
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
