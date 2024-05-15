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
    <>
      <h2>Friends</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Friend</th>
            <th scope="col">Progress</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {friends && friends.map(friend => (
            <tr key={friend.id} className="friend-cards">
              <td>{friend.User.username}</td>
              <td>
                {friend.BookProgresses && friend.BookProgresses.length > 0 ? (
                  <div className="friend-book-prog" key={friend.BookProgresses[0].id}>
                    <img
                      className="friend-book-img"
                      src={friend.BookProgresses[0].Book.coverImageUrl}
                      alt={friend.BookProgresses[0].Book.title}
                      onClick={() => navigate(`/books/${friend.BookProgresses[0].Book.id}`)}
                      />
                    <div className="friend-prog">
                      {friend.BookProgresses[0].Book.title}
                      <div>
                        <span className="progress-container">
                          <progress
                            className="progressBar"
                            value={friend.BookProgresses[0].pagesRead}
                            max={friend.BookProgresses[0].Book.totalPages}
                          ></progress>&nbsp;&nbsp;
                          {percentage(
                            `${friend.BookProgresses[0].Book.totalPages}`,
                            `${friend.BookProgresses[0].pagesRead}`
                          )}%</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>not reading anything right now</div>
                )}
              </td>
              <td>{friend.status}</td>
            </tr>
          ))}
          {!friends && <tr><td colSpan="3">Loading...</td></tr>}
          {friends && friends.length === 0 && <tr><td colSpan="3">No friends found.</td></tr>}
        </tbody>
      </table>
    </>
  )
}

export default Friends;
