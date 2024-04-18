import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './UserCoupons.css'
import { fetchCoupons } from "../../store/coupons";

const UserCoupons = () => {

  const dispatch = useDispatch();

  const coupons = Object.values(useSelector(state => state.coupon))

  const [redeemedCoupons, setRedeemedCoupons] = useState([]);

  useEffect(() => {
    if (coupons.length) {
    dispatch(fetchCoupons())
    }
  }, [dispatch, coupons.length])

  const redeemCoupon = (couponId) => {
    setRedeemedCoupons([...redeemedCoupons, couponId])

  }

  return (
    coupons.length !== 0 ? (
    <div className="coupons-container">
      <h1>your coupons</h1>
      {coupons && coupons.map(coupon => (
        coupon.Coupon &&
        <div className="coupon-cards"
          key={coupon.id}>
          <img src="../../red-pizza.png" />
          <span>{coupon.Coupon.name}</span>
          <span>{coupon.Coupon.description}</span>
          {coupon.redeemedDate ? (
            <span style={{ color: "red" }}>
              redeemed
            </span>
          ) : (
            <button
              onClick={() => redeemCoupon(coupon.Coupon.id)}
              disabled={redeemedCoupons.includes(coupon.Coupon.id)}
            >
              Redeem
            </button>
          )}
          {redeemedCoupons.includes(coupon.Coupon.id) && (
            <span className="coupon-code">Coupon Code: {coupon.Coupon.code}</span>
          )}
        </div>
      ))
      }
    </div>
    ) : (
      <div className="no-coupons">
      you dont have any coupons yet! read more books!
      </div>
    )
  )
}

export default UserCoupons;
