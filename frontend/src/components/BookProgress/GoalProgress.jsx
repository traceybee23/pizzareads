import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import AvailableCouponButton from '../AvailableCoupons/AvailableCouponButton';
import { fetchCoupons } from '../../store/userCoupons';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const GoalProgress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const progresses = Object.values(useSelector(state => state.progress));
  const complete = progresses.filter(progress => progress.completed === true)
  const count = complete.length

  const coupons = Object.values(useSelector(state => state.userCoupon))

  const coupwithnoredeemdate = coupons.find(coupon => coupon.redeemedDate === null)

  const user = useSelector(state => state.session.user)


  useEffect(() => {
    dispatch(fetchCoupons())
  }, [dispatch])

  const milestone = (count) => {
    if (count < 5) {
      return 5 - count;
    } else if (count >= 5 && count < 10) {
      return 10 - count;
    }
  };


  return (
    <div className='goal-progress-container'>
      {(count < 5) && milestone(count) !== 1 && coupons.length === 0 && user.milestone === null &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} books away from a free pizza!
        </h2>
      }
      {!coupwithnoredeemdate && milestone(count) === 1 && coupons.length === 0 && user.milestone === null &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} book away from a free pizza!
        </h2>
      }
      {count === 5 && !coupwithnoredeemdate && coupons.length === 0 && user.milestone === null &&
        <div className="get-pizza-butt">
          <AvailableCouponButton coupons={coupons} navigate={navigate} />
        </div>
      }
      {count === 5 && coupwithnoredeemdate && coupons.length === 0 &&
        <Link to={'/coupons/current'} className='redeem-coupon-link'>
          please redeem your existing coupon
        </Link>
      }
      {(count >= 5 && count < 10) && milestone(count) !== 1 && user.milestone === 1 &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} books away from a free pizza!
        </h2>
      }
      {
        (count >= 5 && count < 10) && milestone(count) === 1 && coupwithnoredeemdate && user.milestone === 1 &&
        <Link to={'/coupons/current'} className='redeem-coupon-link'>
          please redeem your existing coupon
        </Link>
      }
      {!coupwithnoredeemdate && (count >= 5 && count < 10) && milestone(count) === 1 && user.milestone === 1 &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} book away from a free pizza!
        </h2>
      }
      {count === 10 && !coupwithnoredeemdate && user.milestone === 1 &&
        <div className="get-pizza-butt">
          <AvailableCouponButton coupons={coupons} navigate={navigate} />
        </div>
      }
      {
        count === 10 && coupwithnoredeemdate && user.milestone === 1 &&
        <Link to={'/coupons/current'} className='redeem-coupon-link'>
          please redeem your existing coupon
        </Link>
      }

    </div>
  );
};

export default GoalProgress;
