import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import AvailableCouponButton from '../AvailableCoupons/AvailableCouponButton';
import { fetchCoupons } from '../../store/userCoupons';
import { useEffect, useState } from 'react';
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

  console.log(coupons, coupwithnoredeemdate, "COUPWITHNOREDEEMDATE")

  const user = useSelector(state => state.session.user)

  const [slices, setSlices] = useState(0)
  const [newPie, setNewPie] = useState(false)

  useEffect(() => {

    dispatch(fetchCoupons())
    if (!newPie && count < 6) {
      let newCount = count
      setSlices(newCount)
    } else if (!newPie && count < 12) {
      let newCount = count - 6
      setSlices(newCount)
    } else if (!newPie && count < 18) {
      let newCount = count - 12
      setSlices(newCount)
    } else {
      setSlices(0)
    }
  }, [dispatch, count, newPie])

  console.log(count, "THIS IS COUNT")

  const milestone = (count) => {

    if (count < 6) {
      return 6 - count;
    } else if (count >= 6 && count < 12) {
      return 12 - count;
    } else if (count >= 12 && count < 18) {
      return 18 - count;
    }
  };


  return (
    <div className='goal-progress-container'>
      {(count < 6) && milestone(count) !== 1 && coupons.length === 0 && user.milestone === 0 &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} books away from a free pizza!

        </h2>
      }
      {!coupwithnoredeemdate && milestone(count) === 1 && coupons.length === 0 && user.milestone === 0 &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} book away from a free pizza!
        </h2>
      }
      {count >= 6 && user.milestone === 1 &&
        <div className="get-pizza-butt">
          <AvailableCouponButton onClick={() => setNewPie(true)} coupons={coupons} navigate={navigate} />
        </div>
      }
      {count >= 6 && coupwithnoredeemdate &&
        <div className="redeem-coupon-link">
          <Link to={'/coupons/current'} style={{textDecoration: 'none', color: "white"}}>
            please redeem your existing coupon
          </Link>
        </div>
      }
      {(count >= 6 && count < 12) && milestone(count) !== 1 && coupons.length === 1 && user.milestone === 2 &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} books away from a free pizza!
        </h2>
      }
      {
        (count >= 6 && count < 12) && milestone(count) === 1 && coupwithnoredeemdate && user.milestone === 2 &&
        <Link to={'/coupons/current'} className='redeem-coupon-link'>
          please redeem your existing coupon
        </Link>
      }
      {!coupwithnoredeemdate && (count >= 6 && count < 12) && milestone(count) === 1 && user.milestone === 2 &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} book away from a free pizza!
        </h2>
      }
      {count >= 12 && !coupwithnoredeemdate && user.milestone === 3 &&
        <div className="get-pizza-butt">
          <AvailableCouponButton onClick={() => setNewPie(true)} coupons={coupons} navigate={navigate} />
        </div>
      }
      {
        count >= 12 && coupwithnoredeemdate && user.milestone === 3 &&
        <Link to={'/coupons/current'} className='redeem-coupon-link'>
          please redeem your existing coupon
        </Link>
      }
      {(count >= 12 && count < 18) && coupwithnoredeemdate && user.milestone === 4 &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} books away from a free pizza!
        </h2>
      }
      {
        (count >= 12 && count < 18) && milestone(count) === 2 && coupwithnoredeemdate && user.milestone === 4 &&
        <Link to={'/coupons/current'} className='redeem-coupon-link'>
          please redeem your existing coupon
        </Link>
      }
      {!coupwithnoredeemdate && (count >= 12 && count < 18) &&  user.milestone === 4 &&
        <h2 className='goal-progress-banner'>
          You are {milestone(count)} book away from a free pizza!
        </h2>
      }
      {count === 18 && !coupwithnoredeemdate && user.milestone === 5 &&
        <div className="get-pizza-butt">
          <AvailableCouponButton onClick={() => setNewPie(true)} coupons={coupons} navigate={navigate} />
        </div>
      }
      {
        count === 18 && coupwithnoredeemdate && user.milestone === 5 &&
        <Link to={'/coupons/current'} className='redeem-coupon-link'>
          please redeem your existing coupon
        </Link>
      }
      <div className='pizza-slices'>

        {
          !!slices && slices === 1 &&
          <img src='../../slice-1.png' />
        }
        {
          !!slices && slices === 2 &&
          <>
            <img src='../../slice-1.png' />
            <img src='../../slice-2.png' />
          </>
        }
        {
          !!slices && slices === 3 &&
          <>
            <img src='../../slice-1.png' />
            <img src='../../slice-2.png' />
            <img src='../../slice-3.png' />
          </>
        }
        {
          !!slices && slices === 4 &&
          <>
            <img src='../../slice-1.png' />
            <img src='../../slice-2.png' />
            <img src='../../slice-3.png' />
            <img src='../../slice-4.png' />
          </>
        }
        {
          !!slices && slices === 5 &&
          <>
            <img src='../../slice-1.png' />
            <img src='../../slice-2.png' />
            <img src='../../slice-3.png' />
            <img src='../../slice-4.png' />
            <img src='../../slice-5.png' />
          </>
        }
        {
          !!slices && slices === 6 &&
          <>
            <img src='../../slice-1.png' />
            <img src='../../slice-2.png' />
            <img src='../../slice-3.png' />
            <img src='../../slice-4.png' />
            <img src='../../slice-5.png' />
            <img src='../../slice-6.png' />
          </>
        }
      </div>

    </div>
  );
};

export default GoalProgress;
