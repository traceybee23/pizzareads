import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriends } from "../../store/friends";
import { useNavigate } from 'react-router-dom'
import './Friends.css';

const Friends = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const friends = Object.values(useSelector(state => state.friends))


  useEffect(() => {
    dispatch(fetchFriends())
  }, [dispatch])

  const percentage = (x, y) => {
    let total = +x
    let read = +y
    let per = (read / total) * 100
    return Math.floor(per)
  }

  return (
    <div className="friends-page">
      <h1>Friends</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">friend</th>
            <th scope="col">currently reading</th>
            <th scope='col'>completed books</th>
            <th scope="col">friend status</th>
          </tr>
        </thead>
        <tbody>
          {friends && friends.map(friend => {
            // Filter the BookProgresses to get only in-progress books
            const inProgressBooks = friend.BookProgresses.filter(progress => !progress.completed);

            // Filter the BookProgresses to get only completed books
            const completedBooksCount = friend.BookProgresses.filter(progress => progress.completed).length;

            return (
              <tr key={friend.id} className="friend-cards">
                <td>{friend.User.username}</td>
                {inProgressBooks.length > 0 ? (
                  <td>
                    {inProgressBooks.map(progress => (
                      <div className="friend-book-prog" key={progress.id}>
                        <img className="friend-book-img"
                          src={progress.Book.coverImageUrl}
                          alt={progress.Book.title}
                          onClick={() => navigate(`/books/${progress.Book.id}`)}
                        />
                        <div className="friend-prog">
                          {progress.Book.title}
                          <div>
                            <div className="progress-container">
                              <progress
                                className="progressBar"
                                value={progress.pagesRead}
                                max={progress.Book.totalPages}
                              ></progress>&nbsp;&nbsp;
                              {percentage(
                                `${progress.Book.totalPages}`,
                                `${progress.pagesRead}`
                              )}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </td>
                ) : (
                  <td>
                    <div>not reading anything right now</div>
                  </td>
                )}
                <td>
                  {completedBooksCount}
                </td>
                <td>{friend.status}</td>
              </tr>
            );
          })}
          {!friends && <tr><td colSpan="4">Loading...</td></tr>}
          {friends && friends.length === 0 && <tr><td colSpan="4">No friends found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default Friends;
