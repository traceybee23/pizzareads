import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import './AvailableCoupons.css'
import { fetchAvailCoup } from "../../store/coupons";

const AvailableCoupons = () => {

  const dispatch = useDispatch();

  const coupon = Object.values(useSelector(state => state.coupon))

  console.log(coupon)

  useEffect(() => {
    dispatch(fetchAvailCoup())
  }, [dispatch])

  return (
    <div className="avail-coup">
      <div className="coupons-container">
        {coupon && coupon.map(coup => (
          <div key={coup.id} className="coupon-cards">
            <img src="../../red-pizza.png" />
            <span>{coup.coupon.name}</span>
            <span>
              {coup.coupon.description}
            </span>
            <button>add to your collection</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AvailableCoupons;
