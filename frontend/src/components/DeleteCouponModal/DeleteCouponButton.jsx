import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteCouponModal from "./DeleteCouponModal";
import { GiTrashCan } from "react-icons/gi";


const DeleteCouponButton = ({couponId}) => {
  return (
    <OpenModalButton
      buttonText={
        <span className="currently-reading">
          <span className="book-icon"><GiTrashCan /></span>
          <span className="cr-text">&nbsp;delete coupon</span>
        </span>
      }
      couponId={couponId}
      modalComponent={<DeleteCouponModal couponId={couponId} />}
    />
  )
}

export default DeleteCouponButton;
