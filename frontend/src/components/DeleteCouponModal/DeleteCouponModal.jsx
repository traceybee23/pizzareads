import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal';
import { deleteCoupon } from '../../store/userCoupons';
import './DeleteCoupon.css'

const DeleteCouponModal = ({couponId}) => {

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = e => {
    e.preventDefault();
    dispatch(deleteCoupon(couponId))
    .then(closeModal)
    .catch(async (response) => {
      const data = await response.json();
      return data;
    })
  }
  return (
    <>
    <div className='confirm-delete-modal'>
      <h1 className='heading'>confirm delete</h1>
      <span >are you sure you want to delete this coupon? </span>
      <span >action cannot be reversed</span>
      <button onClick={handleDelete}>yes (delete coupon)</button>
      <button style={{backgroundColor: "rgb(146, 119, 117)"}} onClick={closeModal}>no (keep coupon)</button>
    </div>
    </>
  )
}

export default DeleteCouponModal;
