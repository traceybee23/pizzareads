import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBook } from "../../store/books";
import ProgressButton from "../ProgressFormModal/ProgressButton";
import "./SingleBook.css";
import UpdateButton from "../UpdateProgress/UpdateButton";
import { fetchProgresses } from "../../store/progress";
import ReviewButton from "../Reviews/ReviewButton";
import Reviews from "../Reviews";
import { fetchReviews } from "../../store/reviews";

const generateGoogleCalendarLink = (bookTitle, releaseDate) => {
  const eventTitle = encodeURIComponent(`${bookTitle} Release Date`);
  const eventDetails = encodeURIComponent(`Don't miss the release of ${bookTitle}!`);

  // Format the releaseDate as YYYYMMDD (all-day event)
  const formatDateForCalendar = (date) => {
    const eventDate = new Date(date);
    const year = eventDate.getUTCFullYear();
    const month = (eventDate.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = eventDate.getUTCDate().toString().padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const startDate = formatDateForCalendar(releaseDate);
  const endDate = formatDateForCalendar(releaseDate); // All-day event, same start and end date

  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${endDate}&details=${eventDetails}`;

  return googleCalendarUrl;
};

const SingleBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const book = useSelector((state) =>
    state.books ? state.books[bookId] : null
  );
  const userProgress = Object.values(useSelector((state) => state.progress));
  const user = useSelector((state) => state.session.user);
  const bookProgress = userProgress.filter(
    (progress) => progress.bookId === bookId
  );
  const reviews = Object.values(useSelector((state) => state.reviews));
  const bookReviews = useSelector((state) => state.reviews);

  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoad(true);
    if (user?.id) {
      dispatch(fetchProgresses(user?.id));
      dispatch(fetchSingleBook(bookId))
        .then(() => dispatch(fetchReviews(bookId)))
        .then(() => setTimeout(() => setLoad(false), 1000));
    } else {
      dispatch(fetchSingleBook(bookId)).then(() =>
        setTimeout(() => setLoad(false), 1000)
      );
    }
  }, [dispatch, bookId, user?.id]);

  const shouldDisplayReviewButton =
    user &&
    book &&
    !reviews.some(
      (review) => review.userId === user.id && review.bookId === book.id
    );

  const isFutureRelease =
    book?.bookDetails?.publicationDate &&
    new Date(book.bookDetails.publicationDate) > new Date();
  const calendarLink = isFutureRelease
    ? generateGoogleCalendarLink(
        book.bookDetails.title,
        book.bookDetails.publicationDate
      )
    : null;

  return (
    <div className="single-book-page">
      {load ? (
        <div className="single-book-loader">
          <div className="loader"></div>
        </div>
      ) : (
        book &&
        bookId && (
          <>
            <div className="single-book-card">
              <div className="image-container">
                {book?.bookDetails.coverImageUrl !==
                "No cover image available" ? (
                  <img
                    className="book-image"
                    src={book?.bookDetails.coverImageUrl}
                    alt={book.title}
                  />
                ) : (
                  <img
                    className="book-image"
                    src="../no-cover.png"
                    alt="no image"
                  />
                )}
                <div className="curr-read-butt">
                  {isFutureRelease ? (
                    <div>
                    <a
                      href={calendarLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="calendar-btn"
                    >
                      Add to Google Calendar
                    </a>
                    </div>
                  ) : bookProgress.length && user ? (
                    bookProgress.map((progress) => (
                      <div key={progress.id}>
                        {progress.completed ? (
                          <span>
                            you completed this book!
                            <div>
                              {shouldDisplayReviewButton && (
                                <div className="reviewButton">
                                  <ReviewButton bookId={bookId} />
                                </div>
                              )}
                            </div>
                          </span>
                        ) : (
                          <UpdateButton
                            progressId={progress.id}
                            book={book.bookDetails}
                            navigate={navigate}
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <ProgressButton navigate={navigate} />
                  )}
                </div>
              </div>
              <div className="single-book-deets">
                <span className="single-book-title">
                  {book.bookDetails.title}
                </span>
                <span className="single-book-author">
                  {book.bookDetails.author}
                </span>
                <span>
                  <span className="deet-label">Genre:</span>{" "}
                  {book.bookDetails.genre}
                </span>
                <span className="single-book-desc">
                  {book.bookDetails.description}
                </span>
                <span>
                  <span className="deet-label">Total Pages:</span>{" "}
                  {book.bookDetails.totalPages}
                </span>
                <span>
                  <span className="deet-label">Published:</span>{" "}
                  {book.bookDetails.publicationDate}
                </span>
                <span>
                  <span className="deet-label">ISBN:</span>{" "}
                  {book.bookDetails.isbn}
                </span>
              </div>
            </div>
            <div className="reviews">
              {bookReviews.AvgStars ? (
                <span className="rating">
                  <span style={{ fontWeight: "700" }}>
                    {bookReviews.AvgStars} stars
                  </span>{" "}
                  out of {reviews.length}
                  {reviews.length === 1 ? (
                    <span>&nbsp;review</span>
                  ) : (
                    <span>&nbsp;reviews</span>
                  )}
                  <Reviews bookId={bookId} />
                </span>
              ) : isFutureRelease ? (
                <span>this book has not been released yet!</span>
              ) : (
                <div className="bethefirst">Be the first to write a review</div>
              )}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default SingleBook;
