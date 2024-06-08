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

  const [slices, setSlices] = useState(0);
  const [newPie, setNewPie] = useState(false);

  console.log(coupwithnoredeemdate, "couwnoreddemd")
  useEffect(() => {
    dispatch(fetchCoupons());
    dispatch(restoreUser()); // Ensure user data is always up-to-date
    if (!newPie) {
      let newCount = count % 6;
      setSlices(newCount);
    }
  }, [dispatch, count, newPie]);

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
    setNewPie(true);
    await dispatch(fetchCoupons());
    await dispatch(restoreUser()); // Ensure user milestone is updated after grabbing a coupon
  };

  return (
    <div className='goal-progress-container'>
      {bannerMessage && (
        <h2 className='goal-progress-banner'>
          {bannerMessage}
        </h2>
      )}
      {(count >= 6 && user.milestone >= 1) && coupwithnoredeemdate &&  (
        <div className="get-pizza-butt">
          <AvailableCouponButton onClick={handleCouponButtonClick} coupons={coupons} navigate={navigate} />
        </div>
      )}
      {(count >= 6 && user.milestone >= 1) && coupwithnoredeemdate && (
        <div className="redeem-coupon-link">
          <Link to={'/coupons/current'} style={{ textDecoration: 'none', color: "white" }}>
            please redeem your existing coupon
          </Link>
        </div>
      )}
      <div className='pizza-slices'>
        {[...Array(slices)].map((_, i) => (
          <img key={i} src={`../../slice-${i + 1}.png`} alt={`Slice ${i + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default GoalProgress;
