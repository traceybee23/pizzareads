import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './UserCoupons.css'
import { fetchCoupons, redeemCoupon } from "../../store/userCoupons";
import DeleteCouponButton from "../DeleteCouponModal/DeleteCouponButton";

const UserCoupons = () => {

  const dispatch = useDispatch();

  const coupons = Object.values(useSelector(state => state.userCoupon))

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
      <div className="warning-container">
        <span>please write down your coupon code once you redeem</span>
        <span> it will not be visible after leaving this page</span>
      </div>
      {!!coupons.length && coupons.map(coupon => (
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
              <div className="delete-coup">
                <DeleteCouponButton couponId={coupon.Coupon.id} />
              </div>
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
      {!coupons.length && <div className="read-more">read books to earn coupons!</div>}
      <img className="purple-grid-3" src="../../purple-grid.png" />
      <img className="ribbon-accent-3" src="../../ribbon-accent.png" />
      <img className="blue-grid-3" src="../../blue-grid.png" />
      <img className="pizza-dood-3" src="../../pizza-dood.png" />
    </div>

  )
}

export default UserCoupons;
