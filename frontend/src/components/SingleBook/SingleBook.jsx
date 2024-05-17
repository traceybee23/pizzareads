import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, fetchSingleBook } from '../../store/books';
import ProgressButton from '../ProgressFormModal/ProgressButton';
import './SingleBook.css'
import UpdateButton from '../UpdateProgress/UpdateButton';
import { fetchProgresses } from '../../store/progress';
import { clearProgress } from '../../store/progress';
import ReviewButton from '../Reviews/ReviewButton';
import Reviews from '../Reviews';
import { fetchReviews } from '../../store/reviews';


const SingleBook = () => {

  const { bookId } = useParams();
  const navigate = useNavigate();
  const book = useSelector(state => state.books ? state.books[bookId] : null);

  const userProgress = Object.values(useSelector(state => state.progress));

  const user = useSelector(state => state.session.user);
  const bookProgress = userProgress.filter(progress => progress.bookId === +bookId)
  const reviews = Object.values(useSelector(state => state.reviews))

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviews(bookId))
    dispatch(fetchBooks())
    dispatch(fetchSingleBook(bookId));
    if (user) {
      dispatch(fetchProgresses(user.id))
    } else {
      dispatch(clearProgress())
    }
  }, [dispatch, bookId, user])

  const shouldDisplayReviewButton =
    user &&
    book &&
    !reviews.some((review) => review.userId === user.id && review.bookId === book.id)

  return (
    book && bookId &&
    <>
      <div className='single-book-card'>
        <div className='image-container'>
          <img className='book-image' src={book.coverImageUrl} />
          {bookProgress && bookProgress.length ? (
            bookProgress.map(progress => (
              <div className='curr-read-butt' key={progress.id}>
                {progress.completed ? (
                  <span>you already read this book
                    <div>
                      {shouldDisplayReviewButton &&
                        <div className="reviewButton">
                          <ReviewButton bookId={bookId}/>
                        </div>
                      }
                    </div>
                  </span>
                ) : (
                  <UpdateButton progressId={progress.id} book={book} navigate={navigate} />
                )}
              </div>
            ))
          ) : (
            <div className='curr-read-butt'>
              <ProgressButton navigate={navigate} />
            </div>
          )}

        </div>
        <div className='single-book-deets'>
          <span className='single-book-title'>{book.title}</span>
          <span className='single-book-author'>{book.author}</span>
          <span><span className='deet-label'>Genre:</span> {book.genre}</span>
          <span className='single-book-desc' >{book.description}</span>
          <span><span className='deet-label'>Total Pages:</span> {book.totalPages}</span>
          <span><span className='deet-label'>Published:</span> {book.publicationDate}</span>
          <span><span className='deet-label'>ISBN:</span> {book.isbn}</span>
        </div>
      </div>
      <div className='reviews'>
        {
          book.avgStarRating !== "New" ? (
            <span className="rating">
              <span style={{ fontWeight: "700" }}>{book.avgStarRating} stars</span> out of {book.numReviews} reviews
              <Reviews bookId={bookId} />
            </span>
          ) : (
            <div className='bethefirst'>be the first to write a review

            </div>
          )
        }
      </div>
      <img className="purple-grid-0" src="../../purple-grid.png" />
      <img className="ribbon-accent-1" src="../../ribbon-accent.png" />
      <img className="blue-grid-1" src="../../blue-grid.png" />
    </>
  )
}

export default SingleBook;
