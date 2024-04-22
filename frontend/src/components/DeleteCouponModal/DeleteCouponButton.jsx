import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteCouponModal from "./DeleteCouponModal";
import { GiTrashCan } from "react-icons/gi";
import './DeleteCoupon.css'


const DeleteCouponButton = ({couponId}) => {
  return (
    <OpenModalButton
      buttonText={
        <>
          <span className="trash-icon"><GiTrashCan /></span>
          <span className="delete-text">&nbsp;delete coupon</span>
        </>
      }
      couponId={couponId}
      modalComponent={<DeleteCouponModal couponId={couponId} />}
    />
  )
}

export default DeleteCouponButton;
