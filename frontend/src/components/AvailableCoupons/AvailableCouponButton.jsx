import OpenModalButton from "../OpenModalButton/OpenModalButton";

import AvailableCoupons from "./AvailableCouponModal";

const AvailableCouponButton = ({navigate}) => {

  return (
    <>
      <OpenModalButton
        buttonText="click for free pizza"
        modalComponent={<AvailableCoupons navigate={navigate} />}
      />
    </>
  )
}


export default AvailableCouponButton;
