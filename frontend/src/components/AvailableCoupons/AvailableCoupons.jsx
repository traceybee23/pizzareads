import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import './AvailableCoupons.css'
import { addCoupon, fetchAvailCoup } from "../../store/coupons";

const AvailableCoupons = () => {

  const dispatch = useDispatch();

  const coupon = useSelector(state => state.coupon[1]);

  useEffect(() => {
    dispatch(fetchAvailCoup())
  }, [dispatch])

  const handleAddCoupon = (couponId) => {

    dispatch(addCoupon(couponId, coupon))
  }

  return (
    <div className="avail-coup">
      <div className="coupons-container">
        {coupon &&
          <div key={coupon.id} className="coupon-cards">
            <img src="../../red-pizza.png" />
            <span>{coupon.name}</span>
            <span>
              {coupon.description}
            </span>
            <button onClick={() => handleAddCoupon(coupon.id)}>add to your collection</button>
          </div>
        }
      </div>
    </div>
  )
}

export default AvailableCoupons;
