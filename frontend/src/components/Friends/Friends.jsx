import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriends } from "../../store/friends";
import { useNavigate } from 'react-router-dom';
import './Friends.css';

const Friends = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const friends = Object.values(useSelector(state => state.friends));

  // State to track the current progress index for each friend
  const [currentProgressIndex, setCurrentProgressIndex] = useState({});

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  useEffect(() => {
    // Initialize the currentProgressIndex state only once
    if (friends.length > 0 && Object.keys(currentProgressIndex).length === 0) {
      const initialProgressIndex = {};
      friends.forEach(friend => {
        initialProgressIndex[friend.id] = 0;
      });
      setCurrentProgressIndex(initialProgressIndex);
    }
  }, [friends, currentProgressIndex]);

  const percentage = (x, y) => {
    let total = +x;
    let read = +y;
    let per = (read / total) * 100;
    return Math.floor(per);
  };

  const handleNextProgress = (friendId, maxIndex) => {

    setCurrentProgressIndex(prev => {
      const newIndex = (prev[friendId] + 1) % maxIndex;
      return {
        ...prev,
        [friendId]: newIndex
      };
    });
  };

  const handlePreviousProgress = (friendId, maxIndex) => {

    setCurrentProgressIndex(prev => {
      const newIndex = (prev[friendId] - 1 + maxIndex) % maxIndex;
      return {
        ...prev,
        [friendId]: newIndex
      };
    });
  };

  return (
    <div className="friends-page">
      <h1 className="heading">friends</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">friend</th>
            <th scope="col">currently reading</th>
            <th scope="col">completed books</th>
            <th scope="col">friend status</th>
          </tr>
        </thead>
        <tbody>
          {friends && friends.map(friend => {
            const inProgressBooks = friend.BookProgresses?.filter(progress => !progress.completed);
            const completedBooksCount = friend.BookProgresses?.filter(progress => progress.completed).length;

            const currentIndex = currentProgressIndex[friend.id] || 0;

            return (
              <tr key={friend.id} className="friend-cards">
                <td>{friend.User?.username}</td>
                {inProgressBooks?.length > 0 ? (
                  <td>
                    <div className="friend-book-prog" key={inProgressBooks[currentIndex].id}>
                      <img
                        className="friend-book-img"
                        src={inProgressBooks[currentIndex].coverImageUrl}
                        alt={inProgressBooks[currentIndex].title}
                        onClick={() => navigate(`/books/${inProgressBooks[currentIndex].bookId}`)}
                      />
                      <div className="friend-prog">
                        <div className="book-t-f">
                        {inProgressBooks[currentIndex].title}
                        </div>
                        <div>
                          <div className="progress-container">
                            <progress
                              className="progressBar"
                              value={inProgressBooks[currentIndex].pagesRead}
                              max={inProgressBooks[currentIndex].totalPages}
                            ></progress>&nbsp;&nbsp;
                            {percentage(
                              `${inProgressBooks[currentIndex].totalPages}`,
                              `${inProgressBooks[currentIndex].pagesRead}`
                            )}%
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="progress-navigation">
                      {currentIndex > 0 && (
                        <button onClick={() => handlePreviousProgress(friend.id, inProgressBooks.length)}> &lt; </button>
                      )}
                      {currentIndex < inProgressBooks.length - 1 && (
                        <button onClick={() => handleNextProgress(friend.id, inProgressBooks.length)}> &gt; </button>
                      )}
                    </div>
                  </td>
                ) : (
                  <td>
                    <div>not reading anything right now</div>
                  </td>
                )}
                <td>{completedBooksCount}</td>
                <td>{friend.status}</td>
              </tr>
            );
          })}
          {!friends && <tr><td colSpan="4">loading...</td></tr>}
          {friends && friends.length === 0 && <tr><td colSpan="4">no friends found</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default Friends;
