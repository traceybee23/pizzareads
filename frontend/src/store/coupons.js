import { csrfFetch } from './csrf'

const LOAD_COUPONS = 'coupons/LOAD_COUPONS'

const loadCoupons = (coupon) => ({
  type: LOAD_COUPONS,
  coupon
})


export const fetchCoupons = () => async dispatch => {
  const response = await csrfFetch('/api/coupons/current')

  if (response.ok) {
    const coupons = await response.json();
    dispatch(loadCoupons(coupons))
  } else {
    const errors = await response.json();
    return errors
  }
}


const couponReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_COUPONS: {
      const couponState = {}
      action.coupon.UserCoupons.forEach(coupon => {
        couponState[coupon.id] = coupon
      })
      return couponState
    }
    default:
      return state
  }
}

export default couponReducer;
