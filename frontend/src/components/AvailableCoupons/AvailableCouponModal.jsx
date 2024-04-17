import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { addCoupon, fetchAvailCoup } from "../../store/coupons";
import './AvailableCoupon.css'

const AvailableCoupons = () => {

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const coupons = Object.values(useSelector(state => state.coupon));

  useEffect(() => {
    dispatch(fetchAvailCoup())
  }, [dispatch])

  const handleAddCoupon = (couponId, coupon) => {

    dispatch(addCoupon(couponId, coupon))
    closeModal()
  }

  return (
    <div className="avail-coup">
      <div className="coupons-container">
        {coupons && coupons.map(coupon => (
          <div key={coupon.id} className="coupon-cards">
            <img src="../../red-pizza.png" />
            <span>{coupon.name}</span>
            <span>
              {coupon.description}
            </span>
            <button onClick={() => handleAddCoupon(coupon.id, coupon)}>add to your collection</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AvailableCoupons;
