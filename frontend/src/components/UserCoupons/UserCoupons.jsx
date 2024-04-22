import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './UserCoupons.css'
import { fetchCoupons, redeemCoupon } from "../../store/userCoupons";
import DeleteCouponButton from "../DeleteCouponModal/DeleteCouponButton";


const UserCoupons = () => {

  const dispatch = useDispatch();

  const coupons = Object.values(useSelector(state => state.userCoupon))

  console.log(coupons)

  const [redeemedCoupons, setRedeemedCoupons] = useState([]);

  useEffect(() => {

    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleRedeem = (couponId) => {
    setRedeemedCoupons([...redeemedCoupons, couponId])
    dispatch(redeemCoupon(couponId))
  }

  return (

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
            <>
            <span style={{ color: "red" }}>
              redeemed
            </span>
            <DeleteCouponButton couponId={coupon.Coupon.id} />
            </>
          ) : (
            <button
              onClick={() => handleRedeem(coupon.Coupon.id)}
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

  )
}

export default UserCoupons;
