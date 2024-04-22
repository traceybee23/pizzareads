import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import AvailableCouponButton from '../AvailableCoupons/AvailableCouponButton';
import { fetchCoupons } from '../../store/userCoupons';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


const GoalProgress = () => {

  const dispatch = useDispatch();

  const progresses = Object.values(useSelector(state => state.progress));
  const complete = progresses.filter(progress => progress.completed === true)
  const count = complete.length

  const coupons = Object.values(useSelector(state => state.userCoupon))

  const coupwithnoredeemdate = coupons.find(coupon => coupon.redeemedDate === null)

  const user = useSelector(state => state.session.user)

  console.log(user.milestone)

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
      { (count < 5) && milestone(count) !== 1 && coupons.length === 0 && user.milestone === 0 &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} books away from a free pizza!
        </h2>
      }
      { !coupwithnoredeemdate && milestone(count) === 1 && coupons.length === 0 && user.milestone === 0 &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} book away from a free pizza!
        </h2>
      }
      {count === 5 && !coupwithnoredeemdate && coupons.length === 0 && user.milestone === 0 &&
        <div className="get-pizza-butt">
          <AvailableCouponButton coupons={coupons}/>
        </div>
      }
      {count === 5 && coupwithnoredeemdate && coupons.length === 0 &&
        <Link to={'/coupons/current'} className='redeem-coupon-link'>
          please redeem your first coupon
        </Link>
      }
      { (count >= 5 && count < 10) && milestone(count) !== 1 && user.milestone === 1 &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} books away from a free pizza!
        </h2>
      }
      {
        (count >= 5 && count < 10) && milestone(count) === 1 && coupwithnoredeemdate && user.milestone === 1 &&
        <Link to={'/coupons/current'} className='redeem-coupon-link'>
          please redeem your first coupon
        </Link>
      }
      { !coupwithnoredeemdate && (count >= 5 && count < 10) && milestone(count) === 1 && user.milestone === 1 &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} book away from a free pizza!
        </h2>
      }
      {
        count === 10 && coupwithnoredeemdate && coupons.length === 1 && user.milestone === 1 &&
        <Link to={'/coupons/current'} className='redeem-coupon-link'>
          please redeem your first coupon
        </Link>
      }
      {count === 10 && coupwithnoredeemdate && coupons.length === 1 && user.milestone === 1 &&
        <div className="get-pizza-butt">
          <AvailableCouponButton coupons={coupons} />
        </div>
      }
    </div>
  );
};

export default GoalProgress;
