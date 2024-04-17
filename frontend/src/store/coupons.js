import { csrfFetch } from './csrf'

const LOAD_COUPONS = 'coupons/LOAD_COUPONS'
const LOAD_SINGLE_COUPON = 'coupons/LOAD_SINGLE_COUPON'


const loadCoupons = (coupon) => ({
  type: LOAD_COUPONS,
  coupon
})

const loadSingleCoupon = (coupon) => ({
  type: LOAD_SINGLE_COUPON,
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
    case LOAD_COUPONS: {
      const couponState = {}
      action.coupon.UserCoupons.forEach(coupon => {
        couponState[coupon.id] = coupon
      })
      return couponState
    }
    case LOAD_SINGLE_COUPON: {
      const couponState = {}
      couponState[action.coupon.coupon.id] = action.coupon
      return couponState;
    }
    default:
      return state
  }
}

export default couponReducer;
