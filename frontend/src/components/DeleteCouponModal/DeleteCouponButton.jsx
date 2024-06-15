import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteCouponModal from "./DeleteCouponModal";
import { FaRegTrashAlt } from "react-icons/fa";
import './DeleteCoupon.css'


const DeleteCouponButton = ({couponId}) => {
  return (
    <OpenModalButton
      buttonText={
        <>
          <span className="trash-icon"><FaRegTrashAlt /></span>
          <span className="delete-text">&nbsp;delete coupon</span>
        </>
      }
      couponId={couponId}
      modalComponent={<DeleteCouponModal couponId={couponId} />}
    />
  )
}

export default DeleteCouponButton;
