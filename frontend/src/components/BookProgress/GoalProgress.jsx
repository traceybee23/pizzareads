
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const GoalProgress = () => {

  const progresses = Object.values(useSelector(state => state.progress));
  const complete = progresses.filter(progress => progress.completed === true)
  const count = complete.length

  const milestone = (count) => {
    if (count < 5) {
      return 5 - count;
    } else if (count > 5 && count < 10) {
      return 10 - count;
    }
    // Add more conditions for other milestones if needed
  };

  return (
    <div className='goal-progress-container'>
      {count < 5 && <h2> You are {milestone(count)} books away from a free pizza!</h2>}
      {count === 5 && <Link to={'/coupons'}>Click for free pizza</Link>}
      {(count > 5 && count < 10) && <h2> You are {milestone(count)} books away from a free pizza!</h2>}
      {count === 10 && <span>Click for free pizza</span>}
      {/* Add similar conditions for other milestones */}
    </div>
  );
};

export default GoalProgress;
