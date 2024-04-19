import { csrfFetch } from './csrf'

const LOAD_COUPONS = 'coupons/LOAD_COUPONS'
const ADD_COUPON = 'coupons/ADD_COUPON'

const loadCoupons = (coupon) => ( console.log("ACTION", coupon),{
  type: LOAD_COUPONS,
  coupon
})

const receiveCoupon = (coupon) => ({
  type: ADD_COUPON,
  coupon
})


export const fetchCoupons = () => async dispatch => {

  const response = await csrfFetch('/api/coupons/current')
console.log(response, "THUNK")
  if (response.ok) {
    const coupons = await response.json();
    dispatch(loadCoupons(coupons))
  } else {
    const errors = await response.json();
    return errors
  }
}

export const addCoupon = (couponId, coupon) => async dispatch => {
  console.log(couponId, coupon)
  const response = await csrfFetch(`/api/coupons/${couponId}`, {
    method: "POST"
  })
  if (response.ok) {
    const  coupon = await response.json()
    dispatch(receiveCoupon(coupon))
  } else {
    const errors = await response.json();
    return errors
  }
}


const userCouponReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_COUPONS: {
      console.log(state, "REDUCER")
      const couponState = {}
      action.coupon.forEach(coupon => {
        couponState[coupon.id] = coupon
      })
      return couponState
    }
    case ADD_COUPON: {
      const couponState = {}
      couponState[action.coupon.id] = action.coupon
      return couponState;
    }
    default:
      return state
  }
}

export default userCouponReducer;
