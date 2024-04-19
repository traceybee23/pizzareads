import { csrfFetch } from './csrf'


const LOAD_SINGLE_COUPON = 'coupons/LOAD_SINGLE_COUPON'


const loadSingleCoupon = (coupon) => ({
  type: LOAD_SINGLE_COUPON,
  coupon
})


export const fetchAvailCoup = () => async dispatch => {
  const response = await csrfFetch('api/coupons')
  if (response.ok) {
    const coupons = await response.json();
    dispatch(loadSingleCoupon(coupons))
  } else {
    const errors = await response.json();
    return errors
  }
}



const couponReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SINGLE_COUPON: {
      const couponState = {}
      couponState[action.coupon.id] = action.coupon
      return couponState;
    }
    default:
      return state
  }
}

export default couponReducer;
