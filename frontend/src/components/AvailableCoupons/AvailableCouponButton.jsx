import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ProgressButton from "../ProgressFormModal/ProgressButton";
import AvailableCoupons from "./AvailableCouponModal";

const AvailableCouponButton = () => {

  return (
    <>
      <OpenModalButton
        buttonText="click for free pizza"
        modalComponent={<AvailableCoupons/>}
      />
    </>
  )
}


export default AvailableCouponButton;
