import { useSelector } from 'react-redux';
import AvailableCouponButton from '../AvailableCoupons/AvailableCouponButton';

const GoalProgress = () => {

  const progresses = Object.values(useSelector(state => state.progress));
  const complete = progresses.filter(progress => progress.completed === true)
  const count = complete.length

  const coupons = Object.values(useSelector(state => state.coupon))


  const milestone = (count) => {
    if (count < 5) {
      return 5 - count;
    } else if (count >= 5 && count < 10) {
      return 10 - count;
    }
  };


  return (
    <div className='goal-progress-container'>
      {count < 5 && milestone(count) !== 1 &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} books away from a free pizza!
        </h2>
      }
      {count < 5 && milestone(count) === 1 &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} book away from a free pizza!
        </h2>
      }
      {count === 5 && !coupons.length &&
        <div className="get-pizza-butt">
          <AvailableCouponButton />
        </div>
      }
      {!!coupons.length && (count >= 5 && count < 10) && milestone(count) !== 1 &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} books away from a free pizza!
        </h2>
      }
      {!!coupons.length && (count >= 5 && count < 10) && milestone(count) === 1 &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} book away from a free pizza!
        </h2>
      }
      {count === 10 && !coupons.length &&
        <div className="get-pizza-butt">
          <AvailableCouponButton />
        </div>
      }
    </div>
  );
};

export default GoalProgress;
