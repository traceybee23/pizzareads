import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleBook } from '../../store/books';
import ProgressButton from '../ProgressFormModal/ProgressButton';
import './SingleBook.css'
import UpdateButton from '../UpdateProgress/UpdateButton';
import { fetchProgresses } from '../../store/progress';
import { clearProgress } from '../../store/progress';
import ReviewButton from '../Reviews/ReviewButton';
import Reviews from '../Reviews';




const SingleBook = () => {

  const { bookId } = useParams();
  const navigate = useNavigate();
  const book = useSelector(state => state.books ? state.books[bookId] : null);

  const userProgress = Object.values(useSelector(state => state.progress));

  const user = useSelector(state => state.session.user);
  const bookProgress = userProgress.filter(progress => progress.bookId === bookId)
  const reviews = Object.values(useSelector(state => state.reviews))

  const [load, setLoad] = useState(true)

  console.log(userProgress, "USER PROGRESS ON SBP")
  const dispatch = useDispatch();

  useEffect(() => {
    setLoad(true);
    dispatch(fetchSingleBook(bookId))
    .then(() => dispatch(fetchProgresses(user.id)))
    .then(() => setTimeout(() => {
      setLoad(false);
    }, 1000));

  }, [dispatch, bookId])

  const shouldDisplayReviewButton =
    user &&
    book &&
    !reviews.some((review) => review.userId === user.id && review.bookId === book.id)

  return (
    <div className='single-book-page'>
      {load ? (
        <div className='single-book-loader'>
          <div className="loader"></div>
        </div>
      ) : (
        book && bookId &&
        <>
          <div className='single-book-card'>
            <div className='image-container'>
              <img className='book-image' src={book?.bookDetails.coverImageUrl} />
              {bookProgress && bookProgress.length ? (
                bookProgress.map(progress => (
                  <div className='curr-read-butt' key={progress.id}>
                    {progress.completed ? (
                      <span>you already read this book
                        <div>
                          {shouldDisplayReviewButton &&
                            <div className="reviewButton">
                              <ReviewButton bookId={bookId} />
                            </div>
                          }
                        </div>
                      </span>
                    ) : (
                      <UpdateButton progressId={progress.id} book={book.bookDetails} navigate={navigate} />
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
              <span className='single-book-title'>{book.bookDetails.title}</span>
              <span className='single-book-author'>{book.bookDetails.author}</span>
              <span><span className='deet-label'>Genre:</span> {book.bookDetails.genre}</span>
              <span className='single-book-desc' >{book.bookDetails.description}</span>
              <span><span className='deet-label'>Total Pages:</span> {book.bookDetails.totalPages}</span>
              <span><span className='deet-label'>Published:</span> {book.bookDetails.publicationDate}</span>
              <span><span className='deet-label'>ISBN:</span> {book.bookDetails.isbn}</span>
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
        </>
      )}
    </div>
  )
}

export default SingleBook;
