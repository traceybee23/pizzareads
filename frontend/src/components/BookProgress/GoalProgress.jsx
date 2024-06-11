import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AvailableCouponButton from '../AvailableCoupons/AvailableCouponButton';
import { fetchCoupons } from '../../store/userCoupons';
import { useEffect, useState } from 'react';
import { restoreUser } from '../../store/session';

const GoalProgress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const progresses = Object.values(useSelector(state => state.progress));
  const complete = progresses.filter(progress => progress.completed === true);
  const count = complete.length;

  const coupons = Object.values(useSelector(state => state.userCoupon));
  const coupwithnoredeemdate = coupons.find(coupon => coupon.redeemedDate === null);

  const user = useSelector(state => state.session.user);

  const [newCoupon, setNewCoupon] = useState(false);

  useEffect(() => {
    dispatch(fetchCoupons());
    dispatch(restoreUser()); // Ensure user data is always up-to-date

    // Update newCoupon state based on conditions
    if (count >= 6 && count % 6 === 0 && !coupwithnoredeemdate) {
      setNewCoupon(true);
    }
  }, [dispatch, count, coupwithnoredeemdate]);

  const milestone = (count) => {
    return 6 - (count % 6);
  };

  const getBannerMessage = (count, milestone, coupons, user) => {
    if (user.milestone === Math.floor(count / 6)) {
      if (milestone === 1) {
        return `You are ${milestone} book away from a free pizza!`;
      } else {
        return `You are ${milestone} books away from a free pizza!`;
      }
    }
    return null;
  };

  const bannerMessage = getBannerMessage(count, milestone(count), coupons, user);

  const handleCouponButtonClick = async () => {
    setNewCoupon(false); // Assume coupon is grabbed
    await dispatch(fetchCoupons());
    await dispatch(restoreUser()); // Ensure user milestone is updated after grabbing a coupon
    navigate('/coupons/current');
  };

  return (
    <div className='goal-progress-container'>
      {bannerMessage && (
        <h2 className='goal-progress-banner'>
          {bannerMessage}
        </h2>
      )}
      {(newCoupon || (count >= 6 && count % 6 === 0 && !coupwithnoredeemdate)) && (
        <div className="get-pizza-butt">
          <AvailableCouponButton onClick={handleCouponButtonClick} coupons={coupons} navigate={navigate} />
        </div>
      )}
      {(count >= 6 && coupwithnoredeemdate) && (
        <div className="redeem-coupon-link">
          <Link to={'/coupons/current'} style={{ textDecoration: 'none', color: "white" }}>
            Please redeem your existing coupon
          </Link>
        </div>
      )}

      <div className='pizza-slices'>
        {[...Array(6)].map((_, i) => (
          <img
            key={i}
            src={`../../slice-${i + 1}.png`}
            alt={`Slice ${i + 1}`}
            style={{ opacity: i < count % 6 ? 1 : 0.2 }} // Highlight completed slices
          />
        ))}
      </div>
    </div>
  );
};

export default GoalProgress;
